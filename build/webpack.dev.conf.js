var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge') // 用来合并配置文件
var utils = require('./utils') // 工具方法
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map', //开发时做源码调试用的
  plugins: [
    new webpack.DefinePlugin({ 
      'process.env': config.dev.env //把源码中的 'process.env' 替换成 config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(), // webpack 优化插件
    new webpack.HotModuleReplacementPlugin(), // 热加载插件
    new webpack.NoErrorsPlugin(), 
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
})
