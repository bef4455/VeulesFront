import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window', // ou 'self' si vous êtes dans un environnement de travailleurs de service
  },
});
