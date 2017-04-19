var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: [
    require.resolve('./polyfills'),
    'babel-polyfill',
    './client/index.jsx'
  ],
  output: {
    filename: 'app.bundle.js',
    path: path.join('build/')
  },
  devtool: 'source-map',
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
    new CaseSensitivePathsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // TODO: Add the hash so we can cachebust
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      },
      sourceMap: true
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.min\.css$/,
      cssProcessorOptions: { discardComments: { removeAll: true } }
    })
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
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
      }
    ]
  }
};