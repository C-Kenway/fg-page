import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/predict': {
        target: 'http://158.23.136.46:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // build: {
  //   outDir: 'dist'
  // },
});