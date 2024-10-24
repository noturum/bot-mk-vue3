import { fileURLToPath, URL } from "node:url";
import fs from 'fs'
import path from 'path'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  build: { sourcemap: true },
  plugins: [vue()],
  // server: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, 'ssl/certificate.key')),
  //     cert: fs.readFileSync(path.resolve(__dirname, 'ssl/certificate.crt')),
  //   },
  //   port: 3000,
  //   host: '0.0.0.0',
  // },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
