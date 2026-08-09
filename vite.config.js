import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [svgr(), react()],
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 1500, // 1.5 MB
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
});
