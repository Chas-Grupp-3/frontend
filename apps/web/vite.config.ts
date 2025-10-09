import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@chas/ui": resolve(__dirname, "../../packages/UI/src"),
    },
  },
  server: {
    port: 5173,
    host: true, // Needed for Docker to expose the port
    strictPort: true, // Exit if port is already in use
  },
  build: {
    outDir: "dist",
  },
});
