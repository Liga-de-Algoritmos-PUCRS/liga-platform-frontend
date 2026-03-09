import tailwindcss from '@tailwindcss/vite';
import path from "path";
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    tanstackRouter({
      autoCodeSplitting: true,
      target: 'react',
    }),
    react(),
    tailwindcss(),
  ],
  server: {
    allowedHosts: [
      'local.oryzalabsdev.com'
    ]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
