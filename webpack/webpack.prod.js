// const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const Dotenv = require('dotenv-webpack')


module.exports = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [new Dotenv(), new BundleAnalyzerPlugin()],
}
