"use client";
import React, { useEffect, useState } from "react";
import { Spinner, Center, VStack as ChakraVStack, Box as ChakraBox, Text as ChakraText } from "@chakra-ui/react";
import Navbar from "./Navbar/navbar";
import BlogFeedSection from "@/components/BlogFeedSection";
import Hero from "@/components/Hero";
import { VStack, Box, Container, Text } from "@chakra-ui/react";
import useSWR from "swr";

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

  // Aesthetic loading screen
  if (isLoading || (!allFeeds && !error)) {
    return (
      <ChakraVStack minH="100vh" justify="center" align="center" gap={0}>
        <Navbar />
        <Hero />
        <Center w="full" h="60vh">
          <ChakraBox textAlign="center">
            <Spinner size="xl" color="blue.400" mb={6} />
            <ChakraText fontSize="xl" fontWeight="bold" color="blue.500">
              Loading fresh tech blogs...
            </ChakraText>
            <ChakraText fontSize="md" color="gray.400" mt={2}>
              Please wait while we fetch the latest updates from your favorite sources.
            </ChakraText>
          </ChakraBox>
        </Center>
        <ChakraBox as="footer" pt={{ base: 8, md: 12 }} pb={{ base: 10, md: 16 }}>
          <Container className="container-max" textAlign="center">
            <ChakraBox className="hairline" mb={4} />
            <ChakraText fontSize="sm" color="gray.500">
              © 2025 RaceIntel. Crafted for a calm reading experience.
            </ChakraText>
          </Container>
        </ChakraBox>
      </ChakraVStack>
    );
  }

  return (
    <VStack minH="100vh" gap={0}>
      <Navbar />
      <Hero />
      <Box w="full" pt={{ base: 2, md: 2 }}>
        {mounted &&
          blogConfigs.map((cfg) => (
            <BlogFeedSection
              key={cfg.name}
              displayTitle={cfg.title}
              feed={allFeeds && allFeeds[cfg.name] ? allFeeds[cfg.name] : []}
            />
          ))}
      </Box>
      <Box as="footer" pt={{ base: 8, md: 12 }} pb={{ base: 10, md: 16 }}>
        <Container className="container-max" textAlign="center">
          <Box className="hairline" mb={4} />
          <Text fontSize="sm" color="gray.500">
            © 2025 RaceIntel. Crafted for a calm reading experience.
          </Text>
        </Container>
      </Box>
    </VStack>
  );
}
