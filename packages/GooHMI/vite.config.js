import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx'
import { copy } from 'vite-plugin-copy';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    copy([
      { src: 'conf/', dest: 'dist/' }
    ]),
  ],
  build: {
    rollupOptions: {
      // https://rollupjs.org/guide/en/#big-list-of-options
      // 请确保外部化那些你的库中不需要的依赖
      external: [/.*\/conf\/data.js/],
    }
  }
});
