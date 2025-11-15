"use client";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";

export default function Hero() {
  return (
    <Box as="section" pt={{ base: 24, md: 28 }} pb={{ base: 12, md: 16 }} position="relative">
      <Container className="container-max" position="relative" zIndex={1}>
        <VStack gap={{ base: 4, md: 5 }} align="center" textAlign="center">
          {/* Main Heading */}
          <Heading
            as="h1"
            fontSize={{ base: "48px", md: "64px", lg: "72px" }}
            lineHeight={{ base: "1.05", md: "1.05" }}
            letterSpacing="-0.025em"
            fontWeight="600"
            maxW="900px"
            color="var(--text-primary)"
            className="fade-in"
          >
            Engineering insights.
            <br />
            All in one place.
          </Heading>

          {/* Subtitle */}
          <Text
            color="var(--text-secondary)"
            fontSize={{ base: "19px", md: "21px" }}
            maxW="600px"
            lineHeight="1.5"
            fontWeight="400"
            className="fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Read engineering blogs from leading tech companies.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}
