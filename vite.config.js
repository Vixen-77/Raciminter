import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve:{
    alias:{
      "@": path.resolve(__dirname,"src"),
    },
  },
  server: {
    host: '172.20.10.11', // autorise l'accès par IP locale
    port: 3000
  },
  });
