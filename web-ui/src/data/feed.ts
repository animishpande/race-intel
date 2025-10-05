
// Async function to fetch feed from public folder
export async function fetchFeed(): Promise<any[]> {
  try {
    const res = await fetch(process.env.NETFLIX_FEED_URL || '');
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (data.items) return data.items;
    return [];
  } catch {
    return [];
  }
}
