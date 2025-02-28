import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Divider,
  useToast,
} from "@chakra-ui/react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../config/firebase"; // Ensure correct import of Firebase app

export default function Login() {
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const toast = useToast();

  // ✅ Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: "Signed in successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast({
        title: "Google sign-in failed",
        description: (error as Error).message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // ✅ Handle Email Sign-Up (Send Verification Code)
  const handleEmailSignUp = async () => {
    if (!email) {
      toast({
        title: "Please enter a valid email",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const actionCodeSettings = {
      url: window.location.href, // Redirect to the same page
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      setCodeSent(true);
      toast({
        title: "Verification email sent!",
        description: "Check your inbox and enter the verification code.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error sending email",
        description: (error as Error).message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // ✅ Handle Email Verification Code Submission
  const handleVerifyEmail = async () => {
    if (!isSignInWithEmailLink(auth, window.location.href)) {
      toast({
        title: "Invalid or expired link",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const storedEmail = window.localStorage.getItem("emailForSignIn");
    if (!storedEmail) {
      toast({
        title: "No email found. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await signInWithEmailLink(auth, storedEmail, window.location.href);
      window.localStorage.removeItem("emailForSignIn");
      toast({
        title: "Email verified and signed in!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Email verification error:", error);
      toast({
        title: "Verification failed",
        description: (error as Error).message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      display="flex"
      flexDir={{ base: "column", md: "row" }}
      justifyContent="center"
      alignItems="center"
      h="100vh"
      px={6}>
      {/* Left Side: Login Form */}
      <VStack spacing={4} align="center" maxW="400px" flex={1}>
        <Text fontSize="3xl" fontWeight="bold">
          Welcome to GatherPro
        </Text>
        <Text fontSize="md" color="gray.600" textAlign="center">
          Your all-in-one solution for managing events effortlessly
        </Text>

        {/* Google Sign-In Button */}
        <Button
          leftIcon={<FcGoogle />}
          variant="outline"
          size="lg"
          w="100%"
          onClick={handleGoogleSignIn}
          boxShadow="md">
          Sign up with Google
        </Button>

        <Divider my={4} />

        <Text fontSize="sm" fontWeight="bold">
          OR
        </Text>

        {/* Email Sign-Up */}
        <Input
          placeholder="Enter your email"
          size="lg"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          colorScheme="blackAlpha"
          bg="black"
          color="white"
          size="lg"
          w="100%"
          onClick={handleEmailSignUp}>
          Get Started
        </Button>

        {/* Verification Code Entry (Visible After Code is Sent) */}
        {codeSent && (
          <Button
            mt={2}
            colorScheme="blue"
            size="lg"
            w="100%"
            onClick={handleVerifyEmail}>
            Verify Email
          </Button>
        )}
      </VStack>

      {/* Right Side: Placeholder Image */}
      <Box
        flex={1}
        display={{ base: "none", md: "block" }}
        bg="gray.200"
        w="100%"
        h="300px"
        maxW="400px"
        ml={{ md: 10 }}
      />
    </Box>
  );
}
