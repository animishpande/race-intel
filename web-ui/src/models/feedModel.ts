// Utility to fetch and parse the Netflix feed JSON
export default interface FeedItem {
  title: string;
  link: string;
  tags: string[];
  published: string;
  updated: string;
};