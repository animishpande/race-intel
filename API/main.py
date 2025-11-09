from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import os
import feedparser
import uvicorn
import ssl
import httpx
import asyncio
from typing import Dict, List, Optional
from datetime import datetime, timedelta
from functools import lru_cache
ssl._create_default_https_context = ssl._create_unverified_context

load_dotenv()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://raceintel.cloud",
        "https://www.raceintel.cloud",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Entry point for deployment (e.g., Render.com)
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)

# Simple in-memory cache

# Simple in-memory cache
cache: Dict[str, Dict] = {}
# Increase cache TTL to 30 minutes
CACHE_TTL = timedelta(minutes=30)

# Background feed refresh interval (seconds)
FEED_REFRESH_INTERVAL = 1800  # 30 minutes

# RSS Feed configuration
RSS_FEEDS = {
    "netflix": os.getenv("NETFLIX_FEED_URL"),
    "google": os.getenv("GOOGLE_FEED_URL"),
    "dropbox": os.getenv("DROPBOX_FEED_URL"),
    "airbnb": os.getenv("AIRBNB_FEED_URL"),
    "facebook": os.getenv("FACEBOOK_FEED_URL"),
    "spotify": os.getenv("SPOTIFY_FEED_URL"),
    "github": os.getenv("GITHUB_FEED_URL"),
    "pinterest": os.getenv("PINTEREST_FEED_URL"),
    "slack": os.getenv("SLACK_FEED_URL"),
    "cloudflare": os.getenv("CLOUDFLARE_FEED_URL"),
    "nvidia": os.getenv("NVIDIA_FEED_URL"),
    # Add more feeds here
    # "uber": os.getenv("UBER_FEED_URL"),
}

async def fetch_rss_feed(client: httpx.AsyncClient, name: str, url: str) -> Dict:
    """Fetch a single RSS feed with error handling (SSL verification disabled)"""
    try:
        response = await client.get(url, timeout=10.0)
        response.raise_for_status()
        return {
            "name": name,
            "data": response.text,
            "status": "success",
            "timestamp": datetime.now().isoformat()
        }
    except httpx.HTTPError as e:
        return {
            "name": name,
            "error": str(e),
            "status": "error",
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        return {
            "name": name,
            "error": f"Unexpected error: {str(e)}",
            "status": "error",
            "timestamp": datetime.now().isoformat()
        }


# Limit concurrency for feed fetching
async def fetch_all_feeds_parallel(feeds: Dict[str, str], max_concurrent: int = 3) -> Dict:
    """Fetch all RSS feeds in parallel with limited concurrency (SSL verification disabled)"""
    semaphore = asyncio.Semaphore(max_concurrent)
    async with httpx.AsyncClient(verify=False) as client:
        async def sem_fetch(name, url):
            async with semaphore:
                return await fetch_rss_feed(client, name, url)
        tasks = [
            sem_fetch(name, url)
            for name, url in feeds.items()
            if url  # Only fetch if URL is configured
        ]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        # Process results into a dictionary
        return {
            result["name"]: result
            for result in results
            if isinstance(result, dict)
        }

def is_cache_valid(cache_entry: Dict) -> bool:
    """Check if cache entry is still valid"""
    if not cache_entry:
        return False
    timestamp = cache_entry.get("cached_at", "")
    if not timestamp:
        return False
    try:
        timestamp = datetime.fromisoformat(timestamp)
    except Exception:
        return False
    return datetime.now() - timestamp < CACHE_TTL

# =============================================
# API ENDPOINTS
# =============================================


# Helper to parse feed results
def parse_feed_results(results: Dict) -> Dict:
    parsed = {}
    for name, result in results.items():
        if result.get("status") == "success":
            feed = feedparser.parse(result["data"])
            items = []
            for entry in feed.entries:
                item = {
                    "title": entry.title,
                    "link": entry.link,
                    "tags": entry.tags if hasattr(entry, 'tags') else [],
                    "published": entry.published if hasattr(entry, 'published') else "",
                    "updated": entry.updated if hasattr(entry, 'updated') else ""
                }
                items.append(item)
            parsed[name] = items
        else:
            parsed[name] = []
    return parsed

@app.get("/api/feeds/all")
async def get_all_feeds(force_refresh: bool = False):
    """
    Fetch all RSS feeds in parallel
    Query param: force_refresh=true to bypass cache
    Returns: {feed_name: [item, ...], ...}
    """
    # Check cache first
    if not force_refresh and "all_feeds" in cache:
        if is_cache_valid(cache["all_feeds"]):
            return JSONResponse(
                content=cache["all_feeds"]["data"],
                headers={"X-Cache": "HIT"}
            )
        else:
            # Serve stale cache if available while refreshing in background
            stale_data = cache["all_feeds"]["data"]
            # Start background refresh
            asyncio.create_task(background_refresh_all_feeds())
            return JSONResponse(
                content=stale_data,
                headers={"X-Cache": "STALE"}
            )
    # Fetch all feeds in parallel
    results = await fetch_all_feeds_parallel(RSS_FEEDS)
    parsed = parse_feed_results(results)
    # Cache the results
    cache["all_feeds"] = {
        "data": parsed,
        "cached_at": datetime.now().isoformat()
    }
    return JSONResponse(
        content=parsed,
        headers={"X-Cache": "MISS"}
    )


@app.get("/api/feeds/{feed_name}")
async def get_single_feed(feed_name: str, force_refresh: bool = False):
    """
    Fetch a single RSS feed
    Returns: [item, ...]
    """
    if feed_name not in RSS_FEEDS:
        raise HTTPException(status_code=404, detail=f"Feed '{feed_name}' not found")
    url = RSS_FEEDS[feed_name]
    if not url:
        raise HTTPException(status_code=500, detail=f"URL not configured for '{feed_name}'")
    # Check cache
    cache_key = f"feed_{feed_name}"
    if not force_refresh and cache_key in cache:
        if is_cache_valid(cache[cache_key]):
            return JSONResponse(
                content=cache[cache_key]["data"],
                headers={"X-Cache": "HIT"}
            )
        else:
            # Serve stale cache if available while refreshing in background
            stale_data = cache[cache_key]["data"]
            asyncio.create_task(background_refresh_single_feed(feed_name, url, cache_key))
            return JSONResponse(
                content=stale_data,
                headers={"X-Cache": "STALE"}
            )
    # Fetch single feed
    async with httpx.AsyncClient(verify=False) as client:
        result = await fetch_rss_feed(client, feed_name, url)
    # Parse to blog item format
    items = []
    if result.get("status") == "success":
        feed = feedparser.parse(result["data"])
        for entry in feed.entries:
            item = {
                "title": entry.title,
                "link": entry.link,
                "tags": entry.tags if hasattr(entry, 'tags') else [],
                "published": entry.published if hasattr(entry, 'published') else "",
                "updated": entry.updated if hasattr(entry, 'updated') else ""
            }
            items.append(item)
    # Cache the result
    cache[cache_key] = {
        "data": items,
        "cached_at": datetime.now().isoformat()
    }
    return JSONResponse(
        content=items,
        headers={"X-Cache": "MISS"}
    )


@app.post("/api/feeds/batch")
async def get_batch_feeds(feed_names: List[str]):
    """
    Fetch specific feeds by name in parallel
    Body: ["netflix", "google", "dropbox"]
    Returns: {feed_name: [item, ...], ...}
    """
    # Filter for valid feed names
    valid_feeds = {
        name: url for name, url in RSS_FEEDS.items()
        if name in feed_names and url
    }
    if not valid_feeds:
        raise HTTPException(status_code=400, detail="No valid feeds specified")
    # Fetch selected feeds in parallel
    results = await fetch_all_feeds_parallel(valid_feeds)
    parsed = parse_feed_results(results)
    return JSONResponse(content=parsed)
# =============================
# Background Feed Refresh Logic
# =============================

import threading

def run_async_in_thread(coro):
    """Run async coroutine in a background thread."""
    def runner():
        asyncio.run(coro)
    t = threading.Thread(target=runner, daemon=True)
    t.start()

async def background_refresh_all_feeds():
    """Refresh all feeds and update cache in background."""
    results = await fetch_all_feeds_parallel(RSS_FEEDS)
    parsed = parse_feed_results(results)
    cache["all_feeds"] = {
        "data": parsed,
        "cached_at": datetime.now().isoformat()
    }

async def background_refresh_single_feed(feed_name, url, cache_key):
    async with httpx.AsyncClient(verify=False) as client:
        result = await fetch_rss_feed(client, feed_name, url)
    items = []
    if result.get("status") == "success":
        feed = feedparser.parse(result["data"])
        for entry in feed.entries:
            item = {
                "title": entry.title,
                "link": entry.link,
                "tags": entry.tags if hasattr(entry, 'tags') else [],
                "published": entry.published if hasattr(entry, 'published') else "",
                "updated": entry.updated if hasattr(entry, 'updated') else ""
            }
            items.append(item)
    cache[cache_key] = {
        "data": items,
        "cached_at": datetime.now().isoformat()
    }

def periodic_background_refresh():
    """Periodically refresh all feeds in the background."""
    async def periodic():
        while True:
            await background_refresh_all_feeds()
            await asyncio.sleep(FEED_REFRESH_INTERVAL)
    run_async_in_thread(periodic())

# Warm up cache at startup
def warm_up_cache():
    run_async_in_thread(background_refresh_all_feeds())

# Start background refresh and warmup at import time
warm_up_cache()
periodic_background_refresh()

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "configured_feeds": list(RSS_FEEDS.keys()),
        "cache_size": len(cache)
    }

@app.delete("/api/cache/clear")
async def clear_cache():
    """Clear all cached data"""
    cache.clear()
    return {"message": "Cache cleared successfully"}

# Legacy health and blog endpoints (optional, keep for backward compatibility)
@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.get("/getBlogs/{tech_name}", response_model=List[dict])
async def getBlogs(tech_name):
    feed_url = os.getenv(f"{tech_name.upper()}_FEED_URL")
    if feed_url:
        blog_feed = feedparser.parse(feed_url)
        if blog_feed.status == 200:
            blog_details = []
            for entry in blog_feed.entries:
                item = {
                    "title": entry.title,
                    "link": entry.link,
                    "tags": entry.tags if hasattr(entry, 'tags') else [],
                    "published": entry.published if hasattr(entry, 'published') else "",
                    "updated": entry.updated if hasattr(entry, 'updated') else ""
                }
                blog_details.append(item)
            return blog_details
        else:
            return []
    else:
        return []
