const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


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
    },
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
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.css'],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'react-suggestions.css',
    }),
  ],
}
