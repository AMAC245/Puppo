const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
  //devtool: 'source-map',
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: preprocessor.fileRegexp,
        use: [{
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: preprocessor.loaderName
          }
        ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, PROD_PATH), {
      root: process.cwd()
    }),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './' + SRC_PATH + '/index.html',
      filename: 'index.html'
    }),
    new WebpackMd5Hash()
  ]
};