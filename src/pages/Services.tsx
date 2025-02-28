import {
  Box,
  Button,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Badge,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

// Motion wrapper for animations
const MotionBox = motion(Box);

const services = [
  {
    id: 1,
    title: "Track attendees",
    description: "Attendee Management",
    category: "New Release",
    icon: "📅",
  },
  {
    id: 2,
    title: "Promote your events",
    description: "Event Marketing",
    category: "Popular",
    icon: "📢",
  },
  {
    id: 3,
    title: "Track your metrics",
    description: "Insights",
    category: "Recommended",
    icon: "📊",
  },
];

export default function Services() {
  return (
    <VStack spacing={6} align="center" py={10} px={6}>
      {/* Title & Description */}
      <Heading size="xl">Our Services</Heading>
      <Text fontSize="md" color="gray.600" textAlign="center">
        Explore our range of event management solutions
      </Text>

      {/* Button */}
      <Button
        bg="black"
        color="white"
        size="lg"
        _hover={{ bg: "gray.800" }}
        transition="all 0.3s ease-in-out">
        View All Products
      </Button>

      {/* Services Grid */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mt={6} maxW="1200px">
        {services.map((service) => (
          <MotionBox
            key={service.id}
            p={4}
            bg="gray.100"
            borderRadius="md"
            overflow="hidden"
            boxShadow="md"
            position="relative" // ✅ Ensures the category badge stays inside the card
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}>
            {/* Category Badge - FIXED Position */}
            <Badge
              position="absolute"
              top="10px"
              left="10px"
              colorScheme="gray"
              fontSize="sm"
              px={2}
              py={1}
              borderRadius="md"
              zIndex="2" // ✅ Ensures it stays on top inside the card
            >
              {service.category}
            </Badge>

            {/* Placeholder Image */}
            <Box
              bg="gray.300"
              height="200px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="xl"
              fontWeight="bold"
              color="gray.500">
              Icon
            </Box>

            {/* Card Content */}
            <Box p={4} textAlign="center">
              <Text fontSize="sm" color="gray.600">
                {service.description}
              </Text>
              <Heading fontSize="lg" fontWeight="bold" mt={1}>
                {service.title}
              </Heading>
              <Text fontSize="xl" mt={2}>
                {service.icon}
              </Text>
            </Box>
          </MotionBox>
        ))}
      </SimpleGrid>
    </VStack>
  );
}
