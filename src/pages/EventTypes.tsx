import {
  Box,
  Button,
  Heading,
  Text,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

// Register Chart.js components
Chart.register(...registerables);

export default function EventInsights() {
  // Dummy data for event performance
  const data = {
    labels: ["Event A", "Event B", "Event C", "Event D", "Event E", "Event F"],
    datasets: [
      {
        label: "Attendees",
        data: [120, 80, 50, 90, 70, 85],
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, title: { display: true, text: "Events" } },
      y: { title: { display: true, text: "Attendees" } },
    },
  };

  return (
    <VStack spacing={6} align="center" py={10} px={6} w="full">
      {/* Title & Subtitle */}
      <Heading size="xl">Event Insights</Heading>
      <Text fontSize="md" color="gray.600" textAlign="center">
        Track performance and engagement metrics
      </Text>

      {/* Button */}
      <Button
        bg="black"
        color="white"
        size="lg"
        _hover={{ bg: "gray.800" }}
        transition="all 0.3s ease-in-out">
        View Details
      </Button>

      {/* Stats Section */}
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={6}
        mt={6}
        maxW="900px"
        w="full">
        <StatCard title="Total Events" value="75" growth="+15%" />
        <StatCard title="Attendees" value="5000" growth="+30%" />
        <StatCard title="Revenue" value="$100K" growth="+25%" />
      </SimpleGrid>

      {/* Event Performance Chart */}
      <Box
        w="full"
        maxW="900px"
        p={4}
        bg="gray.100"
        borderRadius="md"
        boxShadow="md">
        <Heading fontSize="lg" mb={2}>
          Event Performance
        </Heading>
        <Bar data={data} options={options} />
      </Box>
    </VStack>
  );
}

// ✅ Reusable Card Component for Stats
function StatCard({
  title,
  value,
  growth,
}: {
  title: string;
  value: string;
  growth: string;
}) {
  return (
    <Box p={4} border="1px solid #E2E8F0" borderRadius="md" textAlign="center">
      <Text fontSize="sm" color="gray.600">
        {title}
      </Text>
      <Heading fontSize="2xl" fontWeight="bold">
        {value}
      </Heading>
      <Text fontSize="sm" color="gray.500">
        {growth}
      </Text>
    </Box>
  );
}
