import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
// import { useSelector } from "react-redux";
import { Flex } from "@chakra-ui/react";
import Login from "../pages/Login";
import EventTypes from "../pages/EventTypes";
import Services from "../pages/Services";
import About from "../pages/About";
const Home = lazy(() => import("../pages/Home"));

function AppRoutes() {
  return (
    <Suspense
      fallback={
        <Flex
          // bg="#000!important"
          direction="column"
          h="100vh"
          align="center"
          justify="center"></Flex>
      }>
      <Routes>
        {/* Home Page Routes */}
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/event-types" element={<EventTypes />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
