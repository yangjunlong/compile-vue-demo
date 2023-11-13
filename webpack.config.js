/**
 * webpack.config.js
 * 
 * @author  sobird<i@sobird.me> at 2018-09-10 16:20:52 build.
 * @version $Id$
 */
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { default as VueLoaderPlugin } from 'vue-loader/dist/plugin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


console.log('VueLoaderPlugin1', VueLoaderPlugin);

export default {
  entry: './src/hello.vue',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, './dist'),
    library: 'hello',
    //libraryTarget: 'umd'
  },
  mode: 'development',
  // devtool: 'none',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        loader: 'css-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin.default()
  ]
}