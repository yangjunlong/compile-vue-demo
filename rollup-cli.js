const rollup = require('rollup');
const VuePlugin = require('rollup-plugin-vue').default;

rollup.rollup({
  input: 'src/main.vue',
  plugins: [VuePlugin(/* VuePluginOptions */)],
}).then(bundle => {
  bundle.write({
    file: 'rel/bundle-cli.js',
    format: 'iife',
    name: 'main'
  });
})
