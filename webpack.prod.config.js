const webpack = require('webpack');

if (process.env.NODE_ENV !== 'production') {
  throw new Error('Only call production file when ENV is "production"');
}

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    filename: 'react-infinite-list.js',
    path: './dist',
    library: 'ReactInfiniteList',
    libraryTarget: 'umd',
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
  },
  eslint: {
    configFile: './.eslintrc',
    failOnError: true,
    failOnWarning: true,
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint',
      },
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};
