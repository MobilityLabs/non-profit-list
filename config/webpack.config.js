// @noflow
'use strict';
const os = require('os');
const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: [
    require.resolve('./polyfills'),
    'babel-polyfill',
    './client/index.jsx'
  ],
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, '..', 'build')
  },
  devtool: 'source-map',
  plugins: [
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

      sourceMap: true,
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.min\.css$/,
      cssProcessorOptions: {discardComments: {removeAll: true}}
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      }],
      exclude: [
        /\.html$/,
        /\.(js|jsx)$/,
        /\.css$/,
        /\.json$/,
        /\.svg$/,
        /(\.scss$|\.sass)$/
      ],
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'cache-loader',
        options: {
          cacheDirectory: path.resolve(os.tmpdir(), '.babelcache')
        }
      }, {
        loader: 'babel-loader',
        options: {
          presets: ["es2015", "react", "stage-0"]
        }
      }],
    }, {
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        // We use PostCSS for autoprefixing only. See ./postcss.config.js
        loader: 'postcss-loader',
        options: {
          config: {
            path: path.resolve(__dirname, 'postcss.config.js')
          }
        }
      }, {
        loader: 'sass-loader'
      }]
    }, {
      test: /(\.scss|\.sass)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            config: {
              path: path.resolve(__dirname, 'postcss.config.js')
            }
          }
        }, {
          loader: 'sass-loader'
        }]
      })
    }, {
      test: /\.(js|jsx)$/,

      use: [{
        loader: 'eslint-loader'
      }],

      include: path.resolve(__dirname, '..', 'client'),
      enforce: 'pre'
    }]
  }
};
