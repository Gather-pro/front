import {
  Box,
  Flex,
  Spacer,
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase"; // Ensure correct import of Firebase app
import { getAuth, onAuthStateChanged, User, signOut } from "firebase/auth";

export default function TopNavBar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User has been logged out.");
      window.location.reload();
    } catch (error) {
      console.error("Error logging out user:", error);
    }
  };

  // ✅ Function to get Avatar display name
  const getAvatarName = (): string => {
    if (!user) return "GatherPro"; // Default if no user
    if (user.displayName) {
      const names = user.displayName.split(" ");
      return names.length > 1
        ? `${names[0][0]}${names[1][0]}`.toUpperCase() // First letter of first and last name
        : `${names[0][0]}`.toUpperCase();
    }
    return user.email ? user.email[0].toUpperCase() : "U"; // Default single letter from email
  };

  return (
    <Box
      bg="white"
      px={8}
      py={3}
      boxShadow="sm"
      borderBottom="2px solid #E2E8F0">
      <Flex align="center">
        {/* Logo Placeholder */}
        <HStack spacing={4}>
          <Avatar
            size="sm"
            name={user ? getAvatarName() : "GatherPro"}
            src={user?.photoURL || "/logo.png"}
            onClick={() => {
              if (user) {
                handleSignOut();
                window.location.href = "/home";
              } else return;
            }}
          />
          <Text fontSize="lg" fontWeight="bold" color="black">
            GatherPro
          </Text>
        </HStack>

        <Spacer />

        {/* Navigation Links */}
        <HStack spacing={8} fontSize="md" fontWeight="medium">
          <Link to="/home" style={{ color: "black", textDecoration: "none" }}>
            Home
          </Link>
          <Link
            to="/event-types"
            style={{ color: "black", textDecoration: "none" }}>
            Event Types
          </Link>
          <Link
            to="/services"
            style={{ color: "black", textDecoration: "none" }}>
            Services
          </Link>
          <Link to="/about" style={{ color: "black", textDecoration: "none" }}>
            About
          </Link>
        </HStack>

        <Spacer />

        {/* Search Bar */}
        <InputGroup w="250px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search in site"
            borderRadius="md"
            fontSize="sm"
          />
        </InputGroup>
      </Flex>
    </Box>
  );
}
