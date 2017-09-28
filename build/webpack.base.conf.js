var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../') // 定义项目当前根目录

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath, // publicPath表示请求的静态资源绝对路径
    filename: '[name].js' // filename：输出的文件名字。[name]表示entry对应的key，即app.js
  },
  resolve: { // 通过require或es的import加载资源的相关配置
    extensions: ['', '.js', '.vue'], // 自动补全文件后缀
    fallback: [path.join(__dirname, '../node_modules')], // 在当前文件中找不到时，会去'../node_modules'中去寻找
    alias: { // 别名，通过别名来缩短字符串的长度
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [ // preLoaders 和 loaders功能相似，都是对某一种类型的文件应用某一种loader进行处理，preLoaders会在loaders之前处理
      // webpack的编译阶段就是使用各种loader对各种文件进行编译，根据后缀名匹配不同类型的文件，文件内容作为输入，经过对应loader的处理，将新的文件内容输出
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot, // 表示只检查include中的文件
        exclude: /node_modules/ // 表示排除检查exclude中的文件
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000, 
            // 表示当图片文件小于10kb时，会生成base64，打包到编译后的js文件里
            // 超过10kb时，单独生成一个文件，生成文件名的规则按照属性name的值
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 字体文件的编译
        loader: 'url',
        query: { // 规则同图片规则
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: utils.cssLoaders()
  }
}
