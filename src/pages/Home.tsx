import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  HStack,
  Avatar,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { FaCalendarCheck, FaChartLine, FaUsers } from "react-icons/fa";

// Motion wrapper for animations
const MotionBox = motion(Box);

export default function Home() {
  const auth = getAuth();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (auth.currentUser) {
      setUserName(auth.currentUser.displayName || "User");
    }
  }, [auth]);

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-r, gray.900, gray.800)"
      color="white"
      textAlign="center"
      px={6}
      py={12}>
      {/* Welcome Section */}
      <VStack spacing={4}>
        <Avatar
          size="xl"
          name={userName || "User"}
          src={auth.currentUser?.photoURL || ""}
        />
        <Heading size="2xl" fontWeight="bold">
          Welcome, {userName} 👋
        </Heading>
        <Text fontSize="lg" color="gray.300" maxW="600px">
          Your event management hub is ready! Easily track, manage, and grow
          your events like never before.
        </Text>
        <Button
          bg="blue.500"
          color="white"
          size="lg"
          _hover={{ bg: "blue.400" }}
          transition="all 0.3s ease-in-out">
          Create New Event
        </Button>
      </VStack>

      {/* Quick Access Cards */}
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={8}
        mt={12}
        maxW="1000px"
        mx="auto">
        <FeatureCard
          title="Manage Events"
          description="Track and organize all your events seamlessly."
          icon={<FaCalendarCheck size={40} />}
        />
        <FeatureCard
          title="Analyze Performance"
          description="Gain insights and analytics on your event success."
          icon={<FaChartLine size={40} />}
        />
        <FeatureCard
          title="Grow Your Audience"
          description="Engage with attendees and expand your reach."
          icon={<FaUsers size={40} />}
        />
      </SimpleGrid>
    </Box>
  );
}

// ✅ Feature Card Component for Quick Actions
function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <MotionBox
      p={6}
      bg="gray.700"
      borderRadius="lg"
      boxShadow="lg"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", damping: 10, stiffness: 100 }}>
      <HStack spacing={4} justify="center">
        <Box color="blue.400">{icon}</Box>
        <VStack align="start">
          <Heading fontSize="xl">{title}</Heading>
          <Text fontSize="sm" color="gray.300">
            {description}
          </Text>
        </VStack>
      </HStack>
    </MotionBox>
  );
}
