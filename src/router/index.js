import Vue from 'vue'
import VueRouter from 'vue-router'
if (!window.VueRouter) Vue.use(VueRouter)

// import Home from '@/components/Home'
// import Swiper from '@/components/Swiper'
// // import TopicDetail from '@/components/TopicDetail'
export default new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: resolve => require(['@/components/Home'], resolve),
      // component: Home,
      meta:{keepAlive: true, title: '知乎日报'}
    },
    {
      path: '/Swiper',
      name: 'Swiper',
      component: resolve => require(['@/components/Swiper'], resolve),
      // Swiper,
      meta:{keepAlive: true}
    },
    {
      path: '/news/:id',
      name: 'news',
      component: resolve => require(['@/components/TopicDetail'], resolve),
      // () => import('@/components/TopicDetail'),
      meta:{keepAlive: false}
      //传参
      //监听到路由的变化时,<router-view></router-view>显示为TopicDetail组件
    },
  ]
})
