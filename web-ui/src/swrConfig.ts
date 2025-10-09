import { SWRConfiguration } from "swr";

// Use localStorage for SWR cache persistence
function localStorageProvider(): Map<string, any> {
  if (typeof window === "undefined") {
    // SSR: fallback to in-memory cache
    return new Map<string, any>();
  }
  // Restore only string-keyed entries for SWR compatibility
  const entries: [string, any][] = JSON.parse(localStorage.getItem("swr-cache") || "[]").filter((entry: any[]) => typeof entry[0] === "string");
  const map = new Map<string, any>(entries);
  window.addEventListener("beforeunload", () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem("swr-cache", appCache);
  });
  return map;
}

export const swrConfig: SWRConfiguration = {
  provider: localStorageProvider,
  dedupingInterval: 5 * 60 * 1000,
  revalidateOnFocus: false,
  revalidateIfStale: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: false,
};
