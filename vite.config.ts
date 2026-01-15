import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@components': path.resolve(__dirname, './components'),
      '@data': path.resolve(__dirname, './mcp-server/src/data')
    }
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  }
})
