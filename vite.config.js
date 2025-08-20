import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // forwards /generate -> http://127.0.0.1:8000/generate
      '/generate': { target: 'http://127.0.0.1:8000', changeOrigin: true },
    },
  },
})
