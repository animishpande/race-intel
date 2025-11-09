"use client";
import NextLink from "next/link";
import { Box, Flex, Text, Container, Link } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      as="nav"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg={scrolled ? "var(--nav-bg)" : "transparent"}
      borderBottom={scrolled ? "1px solid var(--nav-border)" : "none"}
      className={scrolled ? "liquid-glass" : ""}
      transition="all 0.3s cubic-bezier(0.28, 0.11, 0.32, 1)"
    >
      <Container maxW="100%" px={{ base: 4, md: 6 }}>
        <Flex h="52px" align="center" justify="space-between">
          {/* Logo */}
          <Link
            as={NextLink}
            href="/"
            _hover={{ textDecoration: "none", opacity: 0.8 }}
            transition="opacity 0.2s ease"
          >
            <Text
              fontSize={{ base: "17px", md: "19px" }}
              fontWeight="600"
              letterSpacing="-0.02em"
              color="var(--nav-fg)"
            >
              RaceIntel
            </Text>
          </Link>

          {/* Navigation Links */}
          <Flex gap={{ base: 4, md: 8 }} align="center">
            <Link
              href="#feeds"
              fontSize="14px"
              fontWeight="400"
              color="var(--text-secondary)"
              _hover={{ color: "var(--text-primary)", textDecoration: "none" }}
              transition="color 0.2s ease"
            >
              Feeds
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;