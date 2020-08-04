// 200324 updated.
// npm install -D koa koa-router koa-static request request-promise
// npm install


// 静态服务器
const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const send = require('koa-send')
const app = new Koa()
const staticPath = './dist'
const opts = {
  maxage: 1000 * 60 * 60 * 24 * 365, // 1年，默认为0
  // hidden: false, // 能否返回隐藏文件（以`.`打头），默认false不返回
  // index: 'index.js', // 默认文件名
  // defer: true, // 在yield* next之后返回静态文件，默认在之前
  gzip: true
  // 允许传输gzip，如静态文件夹下有两个文件，index.js和index.js.gz，
  // 会优先传输index.js.gz，默认开启
};
app.use(static(
  path.join( __dirname,  staticPath), opts
))

// 代理服务器
var rp = require('request-promise');
const router = require('koa-router')();

var aURL = "";
const url = 'http://news-at.zhihu.com/api/4/news/before/20200226';
const baseURL = 'http://news-at.zhihu.com';

// this.axios.get()
// /api/4/news/latest
// /api/4/news/before/20200226
// /api/4/news/id
router.get('/', async function (ctx, next) {
  await rp(url)
    .then(function (response) {
      // console.log("hhh");
      ctx.body = response;
    })
    .catch(function (err) {
      console.log("error");
      ctx.body = "error";
    });
})
router.get('/api/4/news/latest', async function (ctx, next) {
  aURL = baseURL+'/api/4/news/latest'
  await rp(aURL)
    .then(function (response) {
      ctx.body = response;
    })
    .catch(function (err) {
      console.log("error");
      ctx.body = "error";
    });
})
router.get('/api/4/news/:id', async function (ctx, next) {
  var id = ctx.params.id;
  aURL = baseURL+"/api/4/news/"+id;
  await rp(aURL)
    .then(function (response) {
      ctx.body = response;
    })
    .catch(function (err) {
      console.log("error");
      ctx.body = "error";
    });
})
// `/api/4/news/before/`+dateStr
router.get('/api/4/news/before/:dateStr', async function (ctx, next) {
  var dateStr = ctx.params.dateStr;
  aURL = baseURL+"/api/4/news/before/"+dateStr;
  await rp(aURL)
    .then(function (response) {
      ctx.body = response;
    })
    .catch(function (err) {
      console.log("error");
      ctx.body = "error";
    });
})
app.use(router.routes(), router.allowedMethods())


// 放最后，
// 匹配不被koa-static和koa-router捕获的其余路径，比如：http://localhost:3000/hhh
// 不能放在 app.use(router.routes(), router.allowedMethods()) 的前面
app.use(async (ctx) => {
  // ctx.body = 'hello world';
  await send(ctx, 'dist/index.html');
})

app.listen(80, () => {
  console.log('Server is starting at port 80');
})
