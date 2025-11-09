"use client";
import React, { useEffect, useState } from "react";
import { Spinner, Center, VStack as ChakraVStack, Box as ChakraBox, Text as ChakraText, Heading } from "@chakra-ui/react";
import Navbar from "./Navbar/navbar";
import BlogFeedSection from "@/components/BlogFeedSection";
import Hero from "@/components/Hero";
import ScrollToTop from "@/components/ScrollToTop";
import { VStack, Box, Container, Text } from "@chakra-ui/react";
import useSWR from "swr";

const blogConfigs = [
  { name: "netflix", title: "Netflix Tech Blog" },
  { name: "nvidia", title: "NVIDIA Developer Blog" },
  { name: "facebook", title: "Facebook Engineering Blog" },
  { name: "google", title: "Google Developer Blog" },
  { name: "cloudflare", title: "Cloudflare Blog" },
  { name: "airbnb", title: "Airbnb Engineering Blog" },
  { name: "spotify", title: "Spotify Engineering Blog" },
  { name: "github", title: "GitHub Engineering Blog" },
  { name: "pinterest", title: "Pinterest Engineering Blog" },
  { name: "slack", title: "Slack Engineering Blog" },
  { name: "dropbox", title: "Dropbox Tech Blog" },
  // { name: "uber", title: "Uber Engineering Blog" },
];

const fetcher = (...args: [RequestInfo, RequestInit?]) =>
  fetch(...args).then((res) => res.json());

export default function Home() {
  const { data: allFeeds, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/feeds/all`,
    fetcher,
    {
      dedupingInterval: 60 * 1000, // 1 minute
      revalidateOnFocus: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      shouldRetryOnError: false,
    }
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Minimal loading screen
  if (isLoading || (!allFeeds && !error)) {
    return (
      <ChakraVStack minH="100vh" justify="flex-start" align="center" gap={0} position="relative">
        <Navbar />
        <Hero />
        
        <Center w="full" flex={1} py={20}>
          <ChakraBox textAlign="center">
            <Spinner
              size="xl"
              color="var(--accent)"
              borderWidth="2px"
              className="pulse"
            />
            <ChakraText fontSize="17px" color="var(--text-secondary)" mt={4}>
              Loading...
            </ChakraText>
          </ChakraBox>
        </Center>
      </ChakraVStack>
    );
  }

  return (
    <>
      <ScrollToTop />
      <VStack minH="100vh" gap={0} position="relative">
        <Navbar />
        <Hero />
        
        {/* Main Content */}
        <Box w="full" pt={{ base: 2, md: 4 }}>
          {mounted &&
            blogConfigs.map((cfg) => (
              <BlogFeedSection
                key={cfg.name}
                displayTitle={cfg.title}
                feed={allFeeds && allFeeds[cfg.name] ? allFeeds[cfg.name] : []}
              />
            ))}
        </Box>

        {/* Minimal Footer */}
        <Box as="footer" w="full" mt="auto" pt={{ base: 16, md: 20 }} pb={{ base: 8, md: 10 }}>
          <Container className="container-max" textAlign="center">
            <Box className="hairline" mb={4} />
            <Text fontSize="12px" color="var(--text-tertiary)" fontWeight="400">
              © 2025 RaceIntel. All rights reserved.
            </Text>
          </Container>
        </Box>
      </VStack>
    </>
  );
}
