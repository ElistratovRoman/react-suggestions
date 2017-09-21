const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, '/src/index.js'),

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.js',
    publicPath: '/',
    libraryTarget: 'umd',
  },

  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
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
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.css'],
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'react-suggestions.css',
    }),
  ]
}
