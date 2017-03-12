const webpack = require('webpack');

// Helpers
const clean = plugins => plugins.filter(x => !!x);

module.exports = (options = {}) => {
  const isProduction = !!options.production;

  return {
    devtool: isProduction ? 'source-map' : 'eval',
    output: {
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
    performance: !isProduction ? false : {
      hints: 'warning',
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
                failOnError: isProduction,
                failOnWarning: isProduction,
              },
            },
          ],
        },
      ],
    },
    plugins: clean([
      isProduction && new webpack.optimize.OccurrenceOrderPlugin(),

      isProduction && new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),

      isProduction && new webpack.optimize.UglifyJsPlugin({
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
    ]),
  };
};
