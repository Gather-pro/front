import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "./config/firebase";
import AppRoutes from "./routes/AppRoutes.tsx";
import TopNavbar from "./components/TopNavbar";
import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [, setLoading] = useState<boolean>(true);
  const [, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      // Set Firebase authentication persistence
      await setPersistence(auth, browserSessionPersistence);

      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          setIsAuthenticated(true);
          navigate("/home");
        } else {
          setIsAuthenticated(false);
          navigate("/login");
          console.log("No Firebase user available.");
        }
      });

      setLoading(false);

      return () => unsubscribe(); // Cleanup Firebase listener
    };

    init();
  }, []);

  return (
    <Box h={"100vh"}>
      <TopNavbar />
      <AppRoutes />
    </Box>
  );
}
