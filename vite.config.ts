import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
import tailwindcss from '@tailwindcss/vite'

const aliases = {
  '@': path.resolve(__dirname, 'src') 
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: aliases
  }
})
