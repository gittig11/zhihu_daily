import Vue from 'vue'
import App from './App.vue'

import VueAwesomeSwiper from 'vue-awesome-swiper';
// import 'swiper/dist/css/swiper.css' //引入css
// 生产环境也需要导入！
Vue.use(VueAwesomeSwiper)

import axios from 'axios'
// 200706
// axios.defaults.baseURL = 'http://144.202.120.104:3000';
// axios.defaults.baseURL = "https://cors-anywhere.herokuapp.com/http://news-at.zhihu.com";
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);

// import 'mint-ui/lib/style.css'
import { Header } from 'mint-ui';
// import { Header, Button, Lazyload, Popup } from 'mint-ui';
Vue.component(Header.name, Header);
// Vue.component(Button.name, Button);
// Vue.component(Popup.name, Popup);
// Vue.use(Lazyload, {
//   preLoad: 1.3,
//   error: require('./assets/404.jpg'),
//   loading: require('./assets/loading.gif'),
//   attempt: 1
// });

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/404.jpg'),
  loading: require('./assets/loading.gif'),
  attempt: 1
});

// 全部引入
// import 'vue-awesome/icons'
// 按需引入vue-awesome/icons
import 'vue-awesome/icons/user-circle'
import 'vue-awesome/icons/share'
import 'vue-awesome/icons/chevron-left'
import Icon from 'vue-awesome/components/Icon'
Vue.component('v-icon', Icon)

import router from './router'
// router.beforeEach((to, from, next) => {
//   /* 路由发生变化修改页面title */
//   // console.log(to)
//   // console.log(router.app)

//   if (to.meta.title) {
//     document.title = to.meta.title;
//   }
//   // let oTitle = document.querySelector('.headline-title');
//   // if(oTitle){
//   //   console.log(oTitle)
//   // }
//   next()
// })


import VueMeta from 'vue-meta'
Vue.use(VueMeta, {
  // optional pluginOptions
  // refreshOnceOnNavigation: true
})

// 开发环境不能注释掉
import VueScroller from 'vue-scroller'
if (!window.VueScroller) Vue.use(VueScroller)


// import store from './store'

import {BASEURL} from './api/config'

Vue.config.productionTip = false

new Vue({
  // store,
  router,
  data:{
    // baseURL: "http://144.202.120.104:3000",
    // baseURL: "http://localhost:3000",
    // baseURL: "",
    // 不用koa后端代理服务器了
    // baseURL: "https://cors-anywhere.herokuapp.com/http://news-at.zhihu.com",
    baseURL: BASEURL,
  },
  render: h => h(App),
}).$mount('#app')
