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
      bg="rgba(255, 255, 255, 0.05)"
      backdropFilter="blur(20px)"
      borderBottom="1px solid rgba(255, 255, 255, 0.1)"
      boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.37)"
      css={{
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <Container 
        maxW="100%" 
        px={{ base: 4, md: 6 }} // Add responsive padding
      >
        <Flex
          h={{ base: "60px", md: "80px" }} // Responsive height
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          <Link 
            as={NextLink} 
            href="/" 
            _hover={{ textDecoration: "none" }}
            // Increase touch target area
            minH={{ base: "44px", md: "48px" }}
            display="flex"
            alignItems="center"
            px={{ base: 2, md: 0 }}
          >
            <Heading
              as="h1"
              size={{ base: "lg", md: "xl" }} // Responsive font size
              fontWeight="600"
              color="white"
              cursor="pointer"
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              _hover={{
                transform: "translateY(-2px)",
                filter: "brightness(1.2) drop-shadow(0 0 20px rgba(255, 255, 255, 0.4))",
                textShadow: "0 0 30px rgba(255, 255, 255, 0.5)",
              }}
              _active={{
                transform: "translateY(0px)",
                filter: "brightness(0.9)",
              }}
              letterSpacing="-0.025em"
              fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
              userSelect="none"
              whiteSpace="nowrap"
              textShadow="0 0 20px rgba(255, 255, 255, 0.3)"
            >
              RaceIntel
            </Heading>
          </Link>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;