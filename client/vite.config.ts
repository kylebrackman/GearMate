import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': 'http://backend:3000', // Rails backend runs on port 3000
    },
  },
});
