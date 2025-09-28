
"use client";
import React from "react";
import Navbar from "./Navbar/navbar";
import BlogFeedSection from "@/components/BlogFeedSection";
import { VStack, Box } from "@chakra-ui/react";

// Blog config array (add more as needed)
const blogConfigs = [
  { name: "netflix", title: "Netflix Tech Blog" },
  { name: "airbnb", title: "Airbnb Engineering Blog" },
  { name: "facebook", title: "Facebook Engineering Blog" },
  { name: "spotify", title: "Spotify Engineering Blog" },
  { name: "github", title: "GitHub Engineering Blog" },
  { name: "google", title: "Google Developer Blog" },
  { name: "pinterest", title: "Pinterest Engineering Blog" },
  { name: "slack", title: "Slack Engineering Blog" },
  { name: "cloudflare", title: "Cloudflare Blog" },
  { name: "dropbox", title: "Dropbox Tech Blog" },
];

export default function Home() {
  return (
    <VStack minH="100vh" gap={0}>
      <Navbar />
      <Box w="full" pt={{ base: 20, md: 24 }}>
        {blogConfigs.map(cfg => (
          <BlogFeedSection key={cfg.name} blogName={cfg.name} displayTitle={cfg.title} />
        ))}
      </Box>
      <Box as="footer" textAlign="center" p={4} fontSize="sm" color="gray.500">
        &copy; 2025 RaceIntel. All rights reserved.
      </Box>
    </VStack>
  );
}
