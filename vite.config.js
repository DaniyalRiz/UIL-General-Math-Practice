import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const page = (name) => fileURLToPath(new URL(name, import.meta.url));

export default defineConfig({
  // Relative URLs so the build works under any GitHub Pages project path.
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        landing: page('index.html'),
        app: page('app.html'),
        privacy: page('privacy.html'),
        terms: page('terms.html'),
        resetPassword: page('reset-password.html'),
      },
    },
  },
});
