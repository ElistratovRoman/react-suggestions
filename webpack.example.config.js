const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const host = '0.0.0.0'
const port = '3000'

module.exports = {
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${host}:${port}`,
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'example/src/index.js'),
  ],

  output: {
    path: path.join(__dirname, 'example/dist/index.js'),
    filename: 'index.js',
    publicPath: '/',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
    }),

    new webpack.NamedModulesPlugin(),

    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'example/src/index.html'),
    }),
  ],

  resolve: {
    extensions: ['.js', '.css'],

    alias: {
      'react-suggestions': path.join(__dirname, 'dist'),
    },
  },

  devServer: {
    host,
    port,
    contentBase: path.resolve(__dirname, 'example/src'),
    historyApiFallback: true,
    hot: true,
    publicPath: '/',
  },
}
