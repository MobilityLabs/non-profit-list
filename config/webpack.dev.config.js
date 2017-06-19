// @flow
const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

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
    path: path.resolve(__dirname, '/'),
    publicPath: 'http://localhost:3000/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin('/node_modules/')
  ],

  resolve: {
    extensions: ['.js', '.map', '.jsx']
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: [{
        loader: 'eslint-loader'
      }],
      include: path.resolve(__dirname, '..', 'client'),
      enforce: 'pre'
    }, {
      exclude: [
        /\.html$/,
        /\.(js|jsx)$/,
        /\.css$/,
        /\.json$/,
        /\.svg$/,
        /(\.scss$|\.sass)$/
      ],
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      }],
    }, {
      test: /\.(js|jsx)$/,
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
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
        loader: 'postcss-loader'
      }, {
        loader: 'sass-loader'
      }, {
        // We use PostCSS for autoprefixing only. See ./postcss.config.js
        loader: 'postcss-loader',
        options: {
          config: {
            path: path.resolve(__dirname, 'postcss.config.js')
          }
        }
      }]
    }, {
      test: /(\.scss|\.sass)$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'postcss-loader',
        options: {
          config: {
            path: path.resolve(__dirname, 'postcss.config.js')
          }
        },
      }, {
        loader: 'sass-loader'
      }]
    }]
  }
};
