import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      // 🎯 TARGETED FIX for GitHub Pages deployment:
      // Set the base path to your GitHub repository name (with leading/trailing slashes).
      base: '/ryanrealaf-command-center/', 
      
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      // ... rest of your config ...
      define: {
        // No longer needed after Oracle removal
      }, 
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});