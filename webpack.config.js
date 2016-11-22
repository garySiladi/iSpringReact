var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, '/app/index.js'),
	output: {
    path: path.join(__dirname,'build'),
    filename: "bundle.js",
	},
  plugins: [new HtmlWebpackPlugin({
    template: 'app/index.html',
    inject: 'body',
    filename: 'index.html'
  })],
	module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015','react']
        }
      },
      {
        test: /\.json?$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader'
        ]
      },
    ],
	},
};
