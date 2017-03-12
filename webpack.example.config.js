const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = () => ({
  devtool: 'eval',
  entry: `${__dirname}/example/index.js`,
  output: {
    path: '/dist',
    publicPath: '/',
    filename: '[name].[hash:8].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          { loader: 'babel-loader' },
          {
            loader: 'eslint-loader',
            query: {
              configFile: '.eslintrc',
              failOnError: false,
              failOnWarning: false,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap&minimize=false',
        }),
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      inject: true,
      template: 'example/index.html',
    }),

    new ExtractTextPlugin({
      filename: '[name].[hash:8].css',
    }),
  ],
});
