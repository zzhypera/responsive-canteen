import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // host: true listens on all network interfaces, so phones/tablets on the same
  // Wi-Fi can open the "Network" URL that Vite prints in the terminal.
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 }
})
