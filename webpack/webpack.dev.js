// const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devServer: {
    hot: true,
    open: true,
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    //Specify development API URL
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.REACT_APP_API_KEY),
    }),
    new ReactRefreshWebpackPlugin(),
  ],
}
