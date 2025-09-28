import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { Flex, Heading, HStack, Link, VStack, Text, Box } from "@chakra-ui/react";

const fetcher = (...args: [RequestInfo, RequestInit?]) =>
  fetch(...args).then((res) => res.json());

const BlogCard = ({ blog }: { blog: any }) => (
  <Link
    href={blog.link}
    target="_blank"
    rel="noopener noreferrer"
    textDecoration="none"
    _hover={{ textDecoration: "none" }}
  >
    <Box
      minW={{ base: "280px", md: "320px" }}
      maxW={{ base: "280px", md: "320px" }}
      minH={{ base: "180px", md: "180px" }}
      bg="whiteAlpha.100"
      borderRadius="lg"
      boxShadow="md"
      p={6}
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      transition="transform 0.2s, box-shadow 0.2s"
      _hover={{
        transform: "scale(1.04)",
        boxShadow: "lg",
      }}
      cursor="pointer"
    >
      <Heading
        size="md"
        color="white"
        mb={3}
        lineHeight="1.3"
        wordBreak="break-word"
      >
        {blog.title}
      </Heading>
      <Text color="gray.300" fontSize="sm" wordBreak="break-word">
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

export default function BlogFeedSection({ blogName, displayTitle }: { blogName: string; displayTitle: string }) {
  const [feed, setFeed] = useState<any[]>([]);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/getBlogs/${blogName}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setFeed(data);
    }
  }, [data]);

  if (error) {
    return <></>;
  }

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      p={{ base: 8, sm: 5 }}
      gap={8}
      fontFamily="sans-serif"
      w="full"
    >
      <Heading mb={6}>{displayTitle}</Heading>
      <Box
        w="full"
        overflowX="auto"
        px={{ base: 4, md: 8 }}
        css={{
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <HStack gap={6} pb={4} minW="max-content">
          {(feed && Array.isArray((feed as any).blogs) ? (feed as any).blogs : []).map((item: any, index: number) => (
            <BlogCard key={index} blog={item} />
          ))}
        </HStack>
      </Box>
    </Flex>
  );
}
