import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic", // Ensure JSX runtime compatibility
    }),
  ],
  optimizeDeps: {
    include: ["pdfjs-dist"],
    exclude: ["lucide-react"], // Prevent Vite from trying to optimize it
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/, /pdfjs-dist/], // Ensure dependencies are handled properly
    },
    rollupOptions: {
      external: ["react", "react-dom"], // Prevent Rollup bundling issues
    },
  },
});
