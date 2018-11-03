const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {
  PROD_PATH,
  SRC_PATH
} = require('./path');
const {
  preprocessor
} = require('./loader');

module.exports = {
  entry: {
    main: './' + SRC_PATH + '/index.js'
  },
  output: {
    path: path.resolve(__dirname, PROD_PATH),
    filename: '[name].[chunkhash].js'
  },
  //devtool: 'cheap-module-source-map',
  devtool: 'source-map',
  module: {
    rules: [{
      test: preprocessor.fileRegexp,
      use: [{
          loader: MiniCssExtractPlugin.loader
        },
        {
          loader: 'css-loader',
          options: {
            modules: false,
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: preprocessor.loaderName,
          options: {
            sourceMap: true
          }
        },
      ]
    }]
  },
  devServer: {
    port: 4111
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: false,
      template: './' + SRC_PATH + '/index.html',
      filename: 'index.html'
    })
  ]
};