import VuePlugin from 'rollup-plugin-vue'

export default {
  entry: 'src/main.vue',
  format: 'umd',
  dest: 'rel/bundle.js',
  output: {
  	name: 'main',
  },
  plugins: [VuePlugin(/* VuePluginOptions */)],
}