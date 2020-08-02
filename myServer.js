// 静态服务器
const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const app = new Koa()
const staticPath = './dist'
app.use(static(
  path.join( __dirname,  staticPath)
))


// 代理服务器
var rp = require('request-promise');
// const Koa = require('koa');
// const app = new Koa();
const router = require('koa-router')();

var aURL = "";
const url = 'http://news-at.zhihu.com/api/4/news/before/20200226';
const baseURL = 'http://news-at.zhihu.com';

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
// this.axios.get()
// /api/4/news/latest
// /api/4/news/before/20200226
// /api/4/news/id
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
app.listen(3000, () => {
  console.log('Server is starting at port 3000')
})
