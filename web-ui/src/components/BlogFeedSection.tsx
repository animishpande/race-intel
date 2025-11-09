import React from "react";
import { Heading, HStack, Link, Text, Box, Container, VStack } from "@chakra-ui/react";

const BlogCard = ({ blog }: { blog: any }) => {
  return (
    <Link
      href={blog.link}
      target="_blank"
      rel="noopener noreferrer"
      textDecoration="none"
      _hover={{ textDecoration: "none" }}
      _focusVisible={{ outline: "none" }}
      display="block"
    >
      <Box
        minW={{ base: "280px", md: "340px" }}
        maxW={{ base: "280px", md: "340px" }}
        h={{ base: "180px", md: "200px" }}
        bg="var(--card-bg)"
        border="1px solid var(--card-border)"
        borderRadius="16px"
        p={{ base: 5, md: 6 }}
        position="relative"
        overflow="hidden"
        transition="all 0.3s cubic-bezier(0.28, 0.11, 0.32, 1)"
        _hover={{
          bg: "var(--card-hover-bg)",
          transform: "translateY(-2px)",
          boxShadow: "var(--card-hover-shadow)",
        }}
        cursor="pointer"
        className="liquid-glass"
        scrollSnapAlign="start"
      >
        <VStack align="start" justify="space-between" h="full" position="relative" zIndex={1}>
          <VStack align="start" gap={2} flex={1}>
            {/* Title */}
            <Heading
              fontSize={{ base: "17px", md: "19px" }}
              color="var(--text-primary)"
              lineHeight="1.3"
              letterSpacing="-0.01em"
              fontWeight="600"
              css={{
                display: '-webkit-box',
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {blog.title}
            </Heading>
          </VStack>

          {/* Date */}
          <Text color="var(--text-tertiary)" fontSize="13px" fontWeight="400">
            {blog.published
              ? new Date(blog.published).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : ""}
          </Text>
        </VStack>
      </Box>
    </Link>
  );
};

interface BlogFeedSectionProps {
  displayTitle: string;
  feed: any[];
}

export default function BlogFeedSection({ displayTitle, feed }: BlogFeedSectionProps) {
  if (!feed || feed.length === 0) return null;
  
  return (
    <Box
      as="section"
      py={{ base: 8, md: 12 }}
      id={displayTitle.toLowerCase().replace(/\s+/g, '-') === 'netflix-tech-blog' ? 'feeds' : undefined}
      position="relative"
    >
      <Container className="container-wide">
        <VStack align="start" gap={{ base: 4, md: 5 }}>
          {/* Section Header */}
          <Heading
            fontSize={{ base: "32px", md: "40px" }}
            letterSpacing="-0.02em"
            fontWeight="600"
            color="var(--text-primary)"
          >
            {displayTitle}
          </Heading>

          {/* Cards Container */}
          <Box
            w="full"
            overflowX="auto"
            css={{
              "&::-webkit-scrollbar": {
                height: "6px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "3px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "rgba(255, 255, 255, 0.3)",
              },
            }}
          >
            <HStack
              gap={{ base: 4, md: 5 }}
              pb={3}
              minW="max-content"
              scrollSnapType="x mandatory"
            >
              {feed.map((item: any, index: number) => (
                <BlogCard key={index} blog={item} />
              ))}
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
