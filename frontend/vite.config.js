import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          open: true, // Build sonrası raporu tarayıcıda açar
          filename: 'dist/stats.html', // Rapor dosyasının ismi
        }),
      ],
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          antd: ['antd'],
          axios: ['axios'],
        },
      },
    },
  },
})
