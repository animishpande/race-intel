import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { Flex, Heading, HStack, Link, Text, Box, Container } from "@chakra-ui/react";

const fetcher = (...args: [RequestInfo, RequestInit?]) =>
  fetch(...args).then((res) => res.json());

const BlogCard = ({ blog }: { blog: any }) => (
  <Link
    href={blog.link}
    target="_blank"
    rel="noopener noreferrer"
    textDecoration="none"
    _hover={{ textDecoration: "none" }}
    _focusVisible={{ outline: "none" }}
  >
    <Box
      minW={{ base: "300px", md: "360px" }}
      maxW={{ base: "300px", md: "360px" }}
      minH={{ base: "200px", md: "220px" }}
  bg="var(--card-bg)"
  border="1px solid var(--card-border)"
      borderRadius="2xl"
      p={{ base: 5, md: 6 }}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      position="relative"
      transition="transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease, outline-color 200ms ease"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
        borderColor: "rgba(255,255,255,0.2)",
      }}
      _active={{ transform: "translateY(0px) scale(0.99)" }}
      _focusWithin={{ boxShadow: "0 0 0 3px color-mix(in oklab, var(--accent) 35%, transparent)" }}
      cursor="pointer"
      backdropFilter="blur(8px)"
      css={{ WebkitBackdropFilter: "blur(8px)" }}
      scrollSnapAlign="start"
    >
      <Box position="absolute" inset={0} borderRadius="inherit" pointerEvents="none" bgGradient="linear(to-b, rgba(255,255,255,0.06), transparent)" />
      <Heading
        size="md"
  color="var(--card-fg)"
        mb={3}
        lineHeight="1.25"
        letterSpacing="-0.01em"
        wordBreak="break-word"
      >
        {blog.title}
      </Heading>
  <Text color="gray.500" _dark={{ color: "gray.400" }} fontSize="sm" wordBreak="break-word">
        {blog.published
          ? new Date(blog.published).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })
          : ""}
      </Text>
    </Box>
  </Link>
);

interface BlogFeedSectionProps {
  displayTitle: string;
  feed: any[];
}

export default function BlogFeedSection({ displayTitle, feed }: BlogFeedSectionProps) {
  if (!feed) return null;
  return (
    <Box as="section" py={{ base: 8, md: 12 }} id={displayTitle.toLowerCase().replace(/\s+/g, '-') === 'netflix-tech-blog' ? 'feeds' : undefined}>
      <Container className="container-max">
        <Heading
          mb={{ base: 4, md: 6 }}
          size={{ base: "lg", md: "xl" }}
          letterSpacing="-0.02em"
        >
          {displayTitle}
        </Heading>
      </Container>
      <Box
        w="full"
        overflowX="auto"
        px={{ base: 3, md: 6 }}
        css={{
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <HStack gap={{ base: 4, md: 6 }} pb={4} minW="max-content" scrollSnapType="x mandatory">
          {feed.map((item: any, index: number) => (
            <BlogCard key={index} blog={item} />
          ))}
        </HStack>
      </Box>
    </Box>
  );
}
