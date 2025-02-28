import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// Define color mode configuration
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// Define a custom theme
const theme = extendTheme({
  config,
  colors: {
    brand: {
      100: "#FFB82D",
      200: "#E09F3E",
      300: "#FCCA46",
    },
  },
  fonts: {
    body: "Rubik, sans-serif",
    heading: "Rubik, sans-serif",
  },
});

export default theme;
