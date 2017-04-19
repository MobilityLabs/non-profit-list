var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
console.log('Begining webpack.dev.config.js')
module.exports = {
  cache: true,
  entry: [
    require.resolve('./polyfills'),
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './client/index.jsx'
  ],
  devtool: 'source-map',
  target: 'web',

  output: {
    filename: 'app.bundle.js',
    path: '/',
    publicPath: 'http://localhost:3000/'
  },
  // We use PostCSS for autoprefixing only.
  postcss: function() {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ]
      }),
    ];
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin('/node_modules/')
  ],

  resolve: {
    extensions: ['', '.js', '.map', '.jsx', ]
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint',
        include: './client',
      }
    ],
    loaders: [
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/,
          /(\.scss$|\.sass)$/
        ],
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        presets: ["es2015", "react", "stage-0"]
      },
      {
        test: /\.css$/,
        loader: "style!css!postcss!sass"
      },
      {
        test: /(\.scss|\.sass)$/,
        loader: "style!css!postcss!sass"
      }
    ]
  }
};
console.log('End webpack.dev.config.js')