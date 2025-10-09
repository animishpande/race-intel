"use client";
import { Box, Button, Container, Flex, Heading, Text, useDisclosure, DialogRoot, DialogBackdrop, DialogContent, DialogHeader, DialogBody, DialogFooter, DialogTitle, DialogCloseTrigger, } from "@chakra-ui/react";
import { useCallback } from "react";

export default function Hero() {
  const learn = useDisclosure();

  const onExplore = useCallback(() => {
    const el = document.getElementById("feeds");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <Box as="section" pt={{ base: 28, md: 36 }} pb={{ base: 8, md: 10 }} position="relative">
      {/* Subtle radial glow */}
      <Box
        position="absolute"
        inset={0}
        pointerEvents="none"
        bgGradient={{
          base: "radial(500px 200px at 50% -40px, rgba(10,132,255,0.12), transparent 60%)",
          md: "radial(700px 280px at 50% -80px, rgba(10,132,255,0.12), transparent 60%)",
        }}
      />

      <Container className="container-max">
        <Flex direction="column" align="center" textAlign="center" gap={4}>
          <Heading
            as="h1"
            size={{ base: "2xl", md: "3xl" }}
            lineHeight={1.1}
            letterSpacing="-0.02em"
            bgClip="text"
            bgGradient="linear(to-b, var(--hero-text-from), var(--hero-text-to))"
            color="transparent"
            style={{
              WebkitTextFillColor: "transparent",
              textShadow:
                "0 2px 16px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.10)",
            }}
          >
            Engineering intelligence, beautifully.
          </Heading>
          <Text color="gray.400" fontSize={{ base: "md", md: "lg" }} maxW="3xl">
            Follow the latest from top engineering blogs all in one place.
          </Text>
          <Flex gap={3} mt={2}>
            <Button
              size="lg"
              px={6}
              rounded="full"
              bg="var(--btn-primary-bg)"
              color="var(--btn-primary-fg)"
              border="1px solid var(--btn-primary-border)"
              _hover={{ bg: "var(--btn-primary-hover-bg)", transform: "translateY(-1px)" }}
              _active={{ transform: "translateY(0px)" }}
              _focusVisible={{ boxShadow: "0 0 0 3px color-mix(in oklab, var(--accent) 35%, transparent)" }}
              onClick={onExplore}
              aria-label="Explore Feeds"
            >
              Explore Feeds
            </Button>
            <Button
              size="lg"
              px={6}
              rounded="full"
              bg="var(--btn-secondary-bg)"
              color="var(--card-fg)"
              border="1px solid var(--btn-secondary-border)"
              _hover={{ bg: "var(--btn-secondary-hover-bg)" }}
              _focusVisible={{ boxShadow: "0 0 0 3px color-mix(in oklab, var(--accent) 25%, transparent)" }}
              onClick={learn.onOpen}
              aria-label="Learn More"
            >
              Learn More
            </Button>
          </Flex>
        </Flex>
      </Container>

      <DialogRoot open={learn.open} onOpenChange={(e) => (e.open ? learn.onOpen() : learn.onClose())}>
        <DialogBackdrop />
        <DialogContent bg="var(--card-bg)" color="var(--card-fg)" border="1px solid var(--card-border)" backdropFilter="blur(8px)">
          <DialogHeader>
            <DialogTitle>About RaceIntel</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            RaceIntel brings together top engineering and tech blogs into a single, serene reading experience. Track updates from leaders like Netflix, Airbnb, Google, and more—without the noise.
          </DialogBody>
          <DialogFooter>
            <Button onClick={learn.onClose} rounded="full">Close</Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}
