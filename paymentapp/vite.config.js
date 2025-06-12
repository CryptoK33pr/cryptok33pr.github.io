import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: '/paymentapp/',
  plugins: [react()],
  build: {
    outDir: 'paymentapp', // This will put the build output directly in the paymentapp folder
    emptyOutDir: false,   // Prevents Vite from deleting the paymentapp folder before building
  },
});
