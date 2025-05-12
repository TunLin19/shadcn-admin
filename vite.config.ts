import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          // Split large dependencies into separate chunks
          mui: ['@mui/material', '@mui/icons-material'],
          antd: ['antd', '@ant-design/charts']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),

      // fix loading all icon chunks in dev mode
      // https://github.com/tabler/tabler-icons/issues/1233
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/services/shipment/fee": {
        target: "https://services.giaohangtietkiem.vn",
        changeOrigin: true,
        secure: true,
        rewrite: (path) =>
          path.replace(/^\/services\/shipment\/fee/, "/services/shipment/fee"),
      },
    },
  },
  base: 'https://hopestar.vercel.app',
  define: {
    global: 'window', // Ánh xạ global thành window
  },
})
