// @flow
const webpack = require('webpack'),
  webpackDevMiddleware = require('webpack-dev-middleware'),
  webpackHotMiddleware = require('webpack-hot-middleware'),
  webpackconfig = require('./webpack.dev.config.js'),
  webpackcompiler = webpack(webpackconfig);

// enable webpack middleware for hot-reloads in development
function useWebpackMiddleware(app: Server) {
  app.use(webpackDevMiddleware(
    webpackcompiler, {
      entry: [
        require.resolve('./polyfills'),
        'babel-polyfill',
        './client/index.jsx'
      ],
      publicPath: webpackconfig.output.publicPath,
      stats: {
        "colors": true,
        "chunks": false, // Less crap in terminal
        'errors-only': true
      }
    }));
  app.use(webpackHotMiddleware(webpackcompiler, {
    log: console.log // eslint-disable-line no-console
  }));

  return app;
}

module.exports = {
  useWebpackMiddleware
};
