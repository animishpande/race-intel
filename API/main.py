from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import feedparser
import uvicorn
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

load_dotenv()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("FRONTEND_URL", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Entry point for deployment (e.g., Render.com)
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)


@app.get("/getBlogs/{tech_name}", response_model=dict)
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
            return {"blogs": blog_details}
        else:
            return {"message": f"Failed to retrieve feed. Status code: {blog_feed.status}"}
    else:
        return {"message": "No such company available"}
