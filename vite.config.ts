import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import alias from "@rollup/plugin-alias";
import * as path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(),
    alias({
      entries: [
        {find: "@", replacement: path.resolve(__dirname,'src')},
        {find: "@assets", replacement: path.resolve(__dirname,'src/assets')},
        {find: "@styles", replacement: path.resolve(__dirname,'src/styles')},
        {find: "@components", replacement: path.resolve(__dirname,'src/components')},
        {find: "@layouts", replacement: path.resolve(__dirname,'src/components/layouts')},
        {find: "@pages", replacement: path.resolve(__dirname,'src/pages')},
        {find: "@Explore", replacement: path.resolve(__dirname,'src/Explore')},
        {find: "@Gacha", replacement: path.resolve(__dirname,'src/Gacha')},
        {find: "@Main", replacement: path.resolve(__dirname,'src/Main')},
        {find: "@User", replacement: path.resolve(__dirname,'src/User')},
      ]
    })
  ],
})
