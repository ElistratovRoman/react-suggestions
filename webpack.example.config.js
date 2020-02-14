const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const host = '0.0.0.0'
const port = '3000'

module.exports = {
  entry: [path.join(__dirname, 'example/src/index.js')],

  output: {
    path: path.join(__dirname, 'example/dist/index.js'),
    filename: 'index.js',
    publicPath: '/',
  },

  module: {
    rules: [
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
    host: host,
    port: port,
    hot: true,
    quiet: true,
    noInfo: true,
    compress: true,
    historyApiFallback: true,
    disableHostCheck: true,
    contentBase: path.resolve(__dirname, 'example/src'),
    publicPath: '/',

    stats: {
      assets: false,
      cached: false,
      children: false,
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      chunksSort: 'field',
      colors: true,
      errors: true,
      errorDetails: false,
      hash: false,
      modules: false,
      modulesSort: 'field',
      publicPath: false,
      reasons: false,
      source: false,
      timings: false,
      version: false,
      warnings: true,
    },
  },
}
