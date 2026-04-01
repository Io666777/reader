import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // Это позволит писать @/ вместо ../../../
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Здесь можно подключить глобальные переменные (цвета, сетку)
        // additionalData: `@import "@/app/styles/_variables.scss";`
        additionalData: `@import "@/shared/styles/_mixins.scss";`
      }
    }
  }
})