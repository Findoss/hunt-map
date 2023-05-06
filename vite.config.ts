import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  resolve: {
    alias: {
      hooks: path.resolve(__dirname, './src/hooks'),
      store: path.resolve(__dirname, './src/store'),
      constants: path.resolve(__dirname, './src/constants'),
      components: path.resolve(__dirname, './src/components'),
      utils: path.resolve(__dirname, './src/utils'),
      assets: path.resolve(__dirname, './src/assets'),
    },
  },
  plugins: [svgr(), react()],
});
