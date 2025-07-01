import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }),
    mdx({
      remarkPlugins: [remarkGfm],
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          reactThree: [
            '@react-three/fiber',
            '@react-three/drei',
          ],
          mui: [
            '@mui/material',
            '@mui/icons-material',
            '@mui/x-date-pickers',
            '@emotion/react',
            '@emotion/styled',
            'react-select',
          ],
          vendor: [
            'react',
            'react-dom'
          ],
        },
      },
    },
  },
  assetsInclude: ['**/*.glsl'],
})