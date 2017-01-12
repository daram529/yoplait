var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrors = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new webpack.ProvidePlugin({
      // jquery
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      semantic: 'semantic-ui-css',
      Semantic: 'semantic-ui-css',
      'semantic-ui': 'semantic-ui-css'
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new webpack.ProvidePlugin({
      // jquery
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      // semantic-ui | TODO : is usefull since we import it
      semantic: 'semantic-ui-css',
      Semantic: 'semantic-ui-css',
      'semantic-ui': 'semantic-ui-css',
      // Moment
      moment: 'moment',
      Moment: 'moment',
      // Numeral
      numeral: 'numeral',
      Numeral: 'numeral',
      // lodash
      '_': 'lodash',
      'lodash': 'lodash',
      'Lodash': 'lodash',
      // stapes
      stapes: 'stapes',
      Stapes: 'stapes'
    }),
    new FriendlyErrors()
  ]
})
