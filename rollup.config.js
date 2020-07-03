import VuePlugin from 'rollup-plugin-vue'

export default {
  input: 'src/main.vue',
  output: {
  	file: 'rel/bundle.js',
  	format: 'iife',
    name: 'main',
  },
  plugins: [VuePlugin(/* VuePluginOptions */)],
}