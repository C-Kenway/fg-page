import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy: {
      '/predict': {
        target: 'http://158.23.136.46:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
