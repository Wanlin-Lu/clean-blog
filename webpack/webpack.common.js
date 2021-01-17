/* eslint-disable */
'use strict'

const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const commonPaths = require('./path')

const config = {
  entry: path.resolve(__dirname, '../', 'src/js/index.js'),
  output: {
    path: commonPaths.output,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          emitWarning: process.env.NODE_ENV !== 'production',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    alias: {
      images: path.resolve(__dirname, '../', 'src/public/images')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    // new PreloadWebpackPlugin({
    //   excludeHtmlNames: ['header.html'],
    //   include: 'initial',
    //   as(entry) {
    //     if (/\.css$/.test(entry)) return 'style';
    //     // if (/\.woff$/.test(entry)) return 'font';
    //     // if (/\.png$/.test(entry)) return 'image';
    //     return 'script'
    //   },
    // }),
    new CleanWebpackPlugin()
  ],
};

const files = glob.sync('./src/html/*.html')
files.forEach((file) => {
  config.plugins.push(
    new HtmlWebpackPlugin({
      filename: path.basename(file),
      template: file,
      inject: true,
      favicon: path.resolve(__dirname, '../', 'src/public/favicon.ico'),
      minify: process.env.NODE_ENV === 'production',
    })
  )
})

module.exports = config