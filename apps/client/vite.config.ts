import { defineConfig } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import babelMacros from 'vite-plugin-babel-macros';

export default defineConfig({
  build: {
    outDir: 'build',
    emptyOutDir: true,
  },
  publicDir: 'public',
  plugins: [reactPlugin(), babelMacros(), svgrPlugin(), tsconfigPaths()],
});
