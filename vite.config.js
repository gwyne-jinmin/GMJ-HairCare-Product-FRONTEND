// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Set up the proxy to forward /api requests to the Express backend
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Your Express server's address
        changeOrigin: true, // Needed for virtual hosting sites
        secure: false, // For local development
      },
    },
  },
});
