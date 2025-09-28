from dotenv import load_dotenv
import os
import feedparser
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

load_dotenv()

# feed_url = 'https://netflixtechblog.com/feed'
# blog_feed = feedparser.parse(feed_url)

# if blog_feed.status == 200:
#     print(f"Blogg feed: {blog_feed.entries[0].keys()}")
#     print(f"Title: {blog_feed.entries[0].title}, {blog_feed.entries[0].title_detail}, {blog_feed.entries[0].link}, {blog_feed.entries[0].published}, {blog_feed.entries[0].links}, {blog_feed.entries[0].id}, {blog_feed.entries[0].guidislink}, {blog_feed.entries[0].tags}, {blog_feed.entries[0].authors}, {blog_feed.entries[0].author}, {blog_feed.entries[0].author_detail}, {blog_feed.entries[0].published}, {blog_feed.entries[0].published_parsed}, {blog_feed.entries[0].updated}, {blog_feed.entries[0].updated_parsed}, {blog_feed.entries[0].summary}")
#     # for entry in blog_feed.entries:
#     #     # print(f"Entry: {entry.title}")
#     #     print(f"Entry Keys: {list(entry.keys())}")
# else:
#     print(f"Failed to retrieve feed. Status code: {blog_feed.status}")
    
    
# feed_url = os.getenv("FACEBOOK_FEED_URL")
# feed_url = os.getenv("SPOTIFY_FEED_URL")
# feed_url = os.getenv("GITHUB_FEED_URL")
# feed_url = os.getenv("GOOGLE_FEED_URL")
# feed_url = os.getenv("PINTEREST_FEED_URL")
# feed_url = os.getenv("SLACK_FEED_URL")
# feed_url = os.getenv("CLOUDFLARE_FEED_URL")
# feed_url = os.getenv("DROPBOX_FEED_URL")
feed_url = os.getenv("DROPBOX_FEED_URL")
blog_feed = feedparser.parse(feed_url)
    
if blog_feed.status == 200:
    blog_details = []
    # print(blog_feed.entries)
    print(f"Blogg feed: {blog_feed.entries[0].keys()}")
    for entry in blog_feed.entries:
        item = {
            "title": entry.title,
            "link": entry.link,
            "tags": entry.tags if hasattr(entry, 'tags') else [],
            "published": entry.published if hasattr(entry, 'published') else "",
            "updated": entry.published if hasattr(entry, 'updated') else ""
        }
        blog_details.append(item)
    print(blog_details)