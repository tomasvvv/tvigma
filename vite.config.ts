import { defineConfig } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    outDir: 'build',
    emptyOutDir: true,
  },
  publicDir: 'public',
  plugins: [reactPlugin(), svgrPlugin(), tsconfigPaths()],
});
