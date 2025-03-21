import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',  // Ensures relative paths in production
  build: {
    outDir: 'dist', // Ensure it matches Netlify's "publish" directory
  },
  server: {
    port: 3000, // Adjust if needed
    open: true, // Auto open browser on start
  }
});
