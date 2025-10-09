import NextLink from "next/link";
import { Box, Flex, Heading, Container, Link } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box
      as="nav"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg="var(--nav-bg)"
      borderBottom="1px solid var(--nav-border)"
      backdropFilter="saturate(180%) blur(20px)"
      css={{ WebkitBackdropFilter: "saturate(180%) blur(20px)" }}
    >
      <Container maxW="100%" px={{ base: 3, md: 6 }}>
        <Flex h={{ base: "56px", md: "64px" }} align="center">
          <Box w={{ base: 6, md: 8 }} />
          <Flex flex="1" justify="center">
            <Link as={NextLink} href="/" _hover={{ textDecoration: "none" }}>
              <Heading
                as="h1"
                size={{ base: "md", md: "lg" }}
                fontWeight="600"
                letterSpacing="-0.02em"
                color="var(--nav-fg)"
              >
                RaceIntel
              </Heading>
            </Link>
          </Flex>
          <Flex justify="flex-end" w={{ base: 6, md: 8 }} />
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;