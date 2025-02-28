import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
    viteCompression({
      algorithm: "gzip",
    }),
  ],
  server: {
    port: 3000,
    open: true,
    host: "0.0.0.0",
  },
  build: {
    outDir: "dist",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000, // Increase the limit to 1MB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
});
