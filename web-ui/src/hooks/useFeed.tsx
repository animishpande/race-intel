import React, { useEffect, useState } from "react";

export type FeedItem = {
  title: string;
  link: string;
  pubDate?: string;
  description?: string;
};

export default function useFeed() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch("https://netflixtechblog.com/feed", {
          mode: "no-cors",
        });
        console.log(res);
        const xml = await res.text();
        const parser = new window.DOMParser();
        const doc = parser.parseFromString(xml, "application/xml");
        const itemNodes = Array.from(doc.querySelectorAll("item"));
        const feedItems: FeedItem[] = itemNodes.map((item) => ({
          title: item.querySelector("title")?.textContent || "",
          link: item.querySelector("link")?.textContent || "",
          pubDate: item.querySelector("published")?.textContent || "",
          tags: item.querySelector("tags")?.textContent || "",
          updated: item.querySelector("updated")?.textContent || "",
        }));
        setItems(feedItems);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to fetch feed");
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  return { items, loading, error };
}
