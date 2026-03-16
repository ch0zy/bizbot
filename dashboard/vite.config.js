import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set VITE_BASE_PATH in your repo settings if deploying to a sub-path
// e.g. for https://username.github.io/business-hub/ set it to "/business-hub/"
const base = process.env.VITE_BASE_PATH ?? '/'

export default defineConfig({
  plugins: [react()],
  base,
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
