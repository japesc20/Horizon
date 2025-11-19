import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        // This is KEY - it adds props spreading to the svg element
        ref: true,
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false,
                },
              },
            },
          ],
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
