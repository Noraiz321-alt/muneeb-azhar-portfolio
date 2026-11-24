import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/muneeb-azhar-portfolio/',
  build: { sourcemap: false, chunkSizeWarningLimit: 900 },
})
