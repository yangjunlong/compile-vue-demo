/**
 * webpack.config.js
 * 
 * @author  sobird<i@sobird.me> at 2018-09-10 16:20:52 build.
 */

import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import webpack from 'webpack';
// webpack plugin
import HtmlPlugin from 'html-webpack-plugin';
// commonjs
import VueLoaderPlugin from 'vue-loader/dist/plugin.js';
import pkg from './package.json' assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';

export default (env) => {
  const config = {
    entry: {
      app: [
        './src/main.ts'
      ]
    },
    output: {
      filename: '[name].[contenthash].js',
      path: resolve(__dirname, './dist'),
      clean: true,
      // library: 'hello',
      //libraryTarget: 'umd'
    },
    resolve: {
      extensions: ['.ts', '.vue', '.js'],
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    devServer: {
      // open: true,
      host: '0.0.0.0',
      port: 3000,
      hot: true, // 开启HMR功能
      historyApiFallback: true,
      static: {
        directory: resolve(__dirname, 'public')
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
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
      new HtmlPlugin({
        template: resolve('public/index.html'),
        filename: 'index.html',
        cache: false,
        minify: {
          collapseWhitespace: isProduction,
          removeComments: isProduction,
          minifyJS: isProduction,
          minifyCSS: isProduction,
        },
        inject: true,
        title: pkg.description,
      }),
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
      }),
      new VueLoaderPlugin.default()
    ]
  }

  return config;
}