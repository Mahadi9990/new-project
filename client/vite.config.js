import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/user':{
        target:process.env.WEBSITE_ULE,
        secure:false,
      },
    },
  },
  plugins: [react()],
})
