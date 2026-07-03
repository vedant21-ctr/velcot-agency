import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    modulePreload: {
      resolveDependencies() {
        return [];
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if ((id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) && !id.includes('@react-three')) {
              return 'react-vendor';
            }
            if (id.includes('three') || id.includes('@react-three') || id.includes('troika-three-text')) {
              return 'threejs-vendor';
            }
          }
        }
      }
    }
  }
})
