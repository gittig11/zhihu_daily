// 参考：https://www.jianshu.com/p/476387c7fea3

// 代码压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// gzip压缩
const CompressionPlugin = require('compression-webpack-plugin')
// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development'
// 本地环境是否需要使用cdn
const devNeedCdn = false

// cdn链接
const cdn = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vue-scroller':'VueScroller',
    'vue-lazyload':'VueLazyload', //设置后main.js的VueLazyload不起作用
    'vue-awesome-swiper':'VueAwesomeSwiper',
    "axios":"axios",
    // "moment": "moment",
  },
  // cdn的css链接
  css: [
    'https://unpkg.com/swiper@4.5.1/dist/css/swiper.min.css',
    'https://unpkg.com/mint-ui@2.2.13/lib/style.min.css'
  ],
  // cdn的js链接
  js: [
    'https://unpkg.com/vue@2.6.11/dist/vue.min.js',
    'https://unpkg.com/vue-router@3.1.6/dist/vue-router.min.js',
    'https://unpkg.com/vue-scroller@2.2.4/dist/vue-scroller.min.js',
    'https://unpkg.com/vue-lazyload@1.3.3/vue-lazyload.js',
    'https://unpkg.com/axios@0.19.2/dist/axios.min.js',
    'https://unpkg.com/swiper@4.5.1/dist/js/swiper.min.js',
    'https://unpkg.com/vue-awesome-swiper@3.1.3/dist/vue-awesome-swiper.js',
  ]
}
const cdn_css = {
  // cdn的css链接
  css: [
    'https://unpkg.com/swiper@4.5.1/dist/css/swiper.min.css',
    'https://unpkg.com/mint-ui@2.2.13/lib/style.min.css'
  ],
}

module.exports = {
  // chainWebpack: config => {
  //   // 移除 prefetch 插件
  //   config.plugins.delete('prefetch')
  // },

  //是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: true,
  //基本路径
  publicPath:'./',
  //生产环境是否生成 sourceMap 文件，一般情况不建议打开
  productionSourceMap: false,
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host: "localhost", 
    port: '8081',
    https: false,
    hotOnly: false, 
    proxy: {
      '/api': {
        target: 'http://news-at.zhihu.com/api', //API服务器的地址
        ws: true,  //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          '^/api': ''
        }
      }
    },
  },

  chainWebpack: config => {
    // CI/CD时要关闭这个--200804.
    // 可视化分析打包
    // config
    //   .plugin('webpack-bundle-analyzer')
    //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    
    // ============压缩图片 start============
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({ bypassOnDebug: true })
      .end()
    // ============注入cdn start============
    config.plugin('html').tap(args => {
      // 生产环境或本地需要cdn时，才注入cdn
      if (isProduction || devNeedCdn) args[0].cdn = cdn
      // 开发环境只注入CSS，这样就不用import .css
      if (!isProduction) args[0].cdn = cdn_css
      return args
    })
  },
  configureWebpack: config => {
    // 用cdn方式引入，则构建时要忽略相关资源
    if (isProduction || devNeedCdn) config.externals = cdn.externals

    // 生产环境相关配置
    if (isProduction){
      // 代码压缩
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            //生产环境自动删除console
            warnings: false, // Display Warnings
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log']
            }
          },
          sourceMap: false,
          parallel: true
        })
      )

      // gzip
      config.plugins.push(
        new CompressionPlugin({
          test: /\.js$|\.html$|\.css/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 不删除源文件
        })
      )
      // 公共代码抽离
      config.optimization = {
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          name: true,
          cacheGroups: {
            vendor: { // 项目基本框架等
              chunks: 'all',
              test: /[\\/]node_modules[\\/](core-js|vue-axios|vue-meta|mint-ui)[\\/]/,
              name: 'vendor',
              minChunks: 1,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 100
            },
            // 生产环境下通过CDN导入/node_modules/用到的包，不需要生成vendor.js
            // vendor: {
            //   chunks: 'all',
            //   test: /node_modules/,
            //   name: 'vendor',
            //   minChunks: 1,
            //   maxInitialRequests: 5,
            //   minSize: 0,
            //   priority: 100
            // },
            common: { //公共包
              chunks: 'all',
              test: /[\\/]src[\\/]js[\\/]/,
              name: 'common',
              minChunks: 2, // 引入两次及以上被打包
              maxInitialRequests: 5,
              minSize: 0,
              priority: 60
            },
            // main.js import的CSS会被压缩进styles.css，生产环境要注释掉import语句，改用CDN
            styles: {
              name: 'styles',
              test: /\.(sa|sc|c)ss$/,
              chunks: 'all',
              enforce: true
            },
            runtimeChunk: {
              name: 'manifest'
            }
          }
        }
      }
    }
  }

  // configureWebpack: (config) => {
  //   if (process.env.NODE_ENV === 'production') {
  //     config.externals = {
  //       'vue': 'Vue',
  //       'vue-router': 'VueRouter',
  //       'vue-scroller':'VueScroller',
  //       'vue-lazyload':'VueLazyload', //设置后main.js的VueLazyload不起作用
  //       'vue-awesome-swiper':'VueAwesomeSwiper',
  //       'swiper':'Swiper',
  //       // 'mint-ui':'Mint',
  //       // 'jquery':'$',
  //       // "moment": "moment",
  //     }
  //     config.plugins.push(
  //       new CompressionPlugin({
  //         test: /\.js$|\.html$|\.css/, // 匹配文件名
  //         threshold: 10240, // 对超过10k的数据压缩
  //         deleteOriginalAssets: false // 不删除源文件
  //       })
  //     )
  //     // return {
  //     //   plugins: [
  //     //     new CompressionPlugin({
  //     //       test: /\.js$|\.html$|\.css/, // 匹配文件名
  //     //       threshold: 10240, // 对超过10k的数据压缩
  //     //       deleteOriginalAssets: false // 不删除源文件
  //     //     })
  //     //   ]
  //     // }
  //   }
  // },
}
