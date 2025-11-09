"use client";
import { Box, IconButton } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box
      position="fixed"
      bottom={{ base: "20px", md: "32px" }}
      right={{ base: "20px", md: "32px" }}
      zIndex={999}
      opacity={isVisible ? 1 : 0}
      transform={isVisible ? "translateY(0)" : "translateY(12px)"}
      transition="all 0.3s cubic-bezier(0.28, 0.11, 0.32, 1)"
      pointerEvents={isVisible ? "auto" : "none"}
    >
      <IconButton
        aria-label="Scroll to top"
        onClick={scrollToTop}
        size="md"
        borderRadius="full"
        w="44px"
        h="44px"
        bg="var(--card-bg)"
        color="var(--text-primary)"
        border="1px solid var(--card-border)"
        className="liquid-glass"
        _hover={{
          bg: "var(--card-hover-bg)",
          transform: "scale(1.05)",
        }}
        _active={{
          transform: "scale(0.95)",
        }}
        transition="all 0.2s cubic-bezier(0.28, 0.11, 0.32, 1)"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 19V5M12 5L5 12M12 5L19 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </IconButton>
    </Box>
  );
};

export default ScrollToTop;
