var path = require('path') // nodejs提供的API，关于文件路径操作的一些方法
var express = require('express') // nodejs的一个框架，用来启动web-server
var webpack = require('webpack') // 核心编译工具
var config = require('../config') // 配置文件
var proxyMiddleware = require('http-proxy-middleware') // http协议代理
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable // 代理接口

var app = express()
// --------------------------------------------------------------------------------------------

var appData = require('../data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

var apiRoutes = express.Router();
apiRoutes.get('/seller', function(req, res) {
  res.json({
    errno: 0,
    data: seller
  })
});
apiRoutes.get('/goods', function(req, res) {
  res.json({
    errno: 0,
    data: goods
  })
});
apiRoutes.get('/ratings', function(req, res) {
  res.json({
    errno: 0,
    data: ratings
  })
});
app.use('/api', apiRoutes);

// --------------------------------------------------------------------------------------------
var compiler = webpack(webpackConfig)

 // webpack-dev-middleware 是一个中间件，是express为了webpack专门开发的
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath, // 指定静态资源的访问目录
    // 当前文件下并没有文件app.js，是因为webpack中间件将编译好的文件放在内存中，我们访问的是内存中的文件。
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
