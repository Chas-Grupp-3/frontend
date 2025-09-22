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
  build: {
    outDir: "dist",
  },
});
