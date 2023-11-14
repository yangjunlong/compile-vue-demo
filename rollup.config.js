import { dirname, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

import vue from 'rollup-plugin-vue';
import postcss from 'rollup-plugin-postcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: 'src/main.vue',
  output: {
    file: 'rel/bundle.js',
    format: 'iife',
    name: 'main',
  },
  plugins: [
    vue(/* VuePluginOptions */),
    postcss( {
      extract: true,
      minimize: isProduction,
      // plugins: [] // @see postcss.config.js
    }),
  ],
};