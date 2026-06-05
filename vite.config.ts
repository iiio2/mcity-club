import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { beasties } from 'vite-plugin-beasties'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 5000,
  },
  plugins: [
    react(),
    beasties({
      options: {
        preload: 'swap',
      },
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-move',
      '@material-ui/core',
      '@material-ui/icons',
    ],
  },
})
