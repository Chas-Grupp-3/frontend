import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      manifest: {
        name: "Mobile App",
        short_name: "Mobile",
        description: "Mobile PWA Application",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@chas/ui": resolve(__dirname, "../../packages/UI/src"),
    },
  },
  server: {
    port: 5174,
    host: true, // Needed for Docker to expose the port
    strictPort: true, // Exit if port is already in use
    allowedHosts: ["localhost", ".ngrok.io", ".ngrok-free.dev", ".ngrok.app"], // Allow ngrok hosts
        watch: {
          usePolling: true,
          interval: 100,
    },
  },
  build: {
    outDir: "dist",
  },
  // Help Vite resolve modules from workspace root
  optimizeDeps: {
    include: ["vite-plugin-pwa"],
    exclude: ["fsevents"], // Exclude fsevents from optimization
  },
});
