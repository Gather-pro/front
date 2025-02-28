import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  VStack,
  Container,
  Center,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

// Motion wrapper for animations
const MotionBox = motion(Box);

export default function About() {
  return (
    <Container maxW="900px" py={12} textAlign="center">
      {/* Heading Section */}
      <Heading size="2xl" fontWeight="bold" mb={4}>
        About GatherPro
      </Heading>
      <Text fontSize="lg" color="gray.600" mb={6}>
        Elevating event management to levels never seen before.
      </Text>

      {/* Company Story */}
      <VStack
        spacing={5}
        align="center"
        textAlign="left"
        maxW="800px"
        mx="auto">
        <Text fontSize="md">
          <b>GatherPro</b> was founded by <b>Michelle Pomeranc</b> and{" "}
          <b>Evyatar Haim</b> with a bold vision— to revolutionize event
          management like no platform has ever done before.
        </Text>
        <Text fontSize="md">
          In a world where events bring people together, we saw a gap—existing
          platforms were outdated, complicated, and lacked true innovation.
        </Text>
        <Text fontSize="md">
          <b>GatherPro is here to change that.</b>
        </Text>
        <Text fontSize="md">
          🌟 <b>AI-Powered Planning</b>—From guest lists to real-time event
          tracking. 🎉 <b>Effortless Management</b>—A sleek and intuitive
          experience for users. 📊 <b>Data-Driven Insights</b>—Helping hosts
          optimize every event for success.
        </Text>
        <Text fontSize="md">
          Whether it’s a <b>corporate conference, wedding, or festival</b>,
          GatherPro is setting a new industry standard—making event planning
          seamless, smart, and stress-free.
        </Text>
      </VStack>

      {/* AI-Generated Image */}
      <MotionBox
        mt={10}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}>
        <Image
          src="/aboutImage.png"
          alt="GatherPro Vision"
          borderRadius="md"
          shadow="lg"
        />
      </MotionBox>
    </Container>
  );
}
