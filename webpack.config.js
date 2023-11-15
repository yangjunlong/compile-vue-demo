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
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import pkg from './package.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';
const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

export default (env) => {
  const config = {
    devtool: isProduction ? false : 'inline-source-map',
    entry: {
      app: [
        './src/main.ts'
      ]
    },
    output: {
      path: resolve(__dirname, './dist'),
      clean: true,
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[contenthash].chunk.js',
      assetModuleFilename: 'assets/[contenthash][ext][query]',
      hashDigestLength: 8,
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
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.s[ac]ss$/i,
          use: [stylesHandler, 'css-loader', 'postcss-loader', 'sass-loader'],
        },
        {
          test: /\.css$/i,
          use: [stylesHandler, 'css-loader', 'postcss-loader'],
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
  };

  if (isProduction) {
    config.plugins.push(new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
      ignoreOrder: true,
    }));
    // config.plugins.push(new webpack.SourceMapDevToolPlugin({
    //   test: /\.(tsx|jsx|js)$/,
    //   filename: '[file].map',
    //   publicPath: '/',
    // }));
  } else {
    config.plugins.push(new webpack.ProgressPlugin({
      activeModules: true,
    }));
  }

  return config;
};