<template>
  <keep-alive>
    <swiper v-if="list.length > 1" :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <!-- <swiper-slide>I'm Slide 1</swiper-slide>
      <swiper-slide>I'm Slide 2</swiper-slide>
      <swiper-slide>I'm Slide 3</swiper-slide>
      <swiper-slide>I'm Slide 4</swiper-slide>
      <swiper-slide>I'm Slide 5</swiper-slide>
      <swiper-slide>I'm Slide 6</swiper-slide>
      <swiper-slide>I'm Slide 7</swiper-slide> -->
      <swiper-slide v-for="(item,index) in list" :key="index">
        <router-link :to="'/news/'+item.id" tag="div">
          <img :src="item.image" />
          <div class="img-mask"></div>
          <!-- <router-link :to="'/news/'+item.id" tag="div" class="img-mask"></router-link> -->
          <div class="img-title">{{item.title}}</div>
          <div class="img-hint">{{item.hint}}</div>
        </router-link>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </keep-alive>
</template>

<script>
export default {
  name: 'carrousel',
  data() {
    return {
      // baseURL: "http://144.202.120.104:3000",
      // baseURL: "",
      // "http://localhost:3000",
      list: [],
      swiperOption: {
        // autoplay: true, //默认3000ms
        autoplay: { //对象
          delay: 2000,
        },
        loop: true,
        pagination: {
          el: '.swiper-pagination',  //下方的圆点
          // bulletActiveClass: 'my-bullet-active',
        }
      }
    }
  },
  // computed: {
  //   swiper() {
  //     return this.$refs.mySwiper.swiper
  //   }
  // },
  // mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // console.log('this is current swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
  // }
  mounted() {
    this.getList();
  },
  methods:{
    getImage(url){
      // console.log(url);
      if(url !== undefined){
        return url.replace(/http\w{0,1}:\/\/p/g,'https://images.weserv.nl/?url=p');
      }
    },
    getList(){
      this.axios.get(this.$root.baseURL+'/api/4/news/latest').then((response)=>{
        this.list = response.data.top_stories;
        // console.log(this.list);
      }).catch((response)=>{
        console.log(response);
      })
    }
  }
}
</script>

<style>
.swiper-container {
  width: 100%;
  height: 300px;
}
/* Swiper图片随着页面宽度增加而放大的效果 */
.swiper-slide img{
  width: 100%;
  height: auto;
  position: absolute;
  left: 0;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}

.img-mask {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: -moz-linear-gradient(top, rgba(0,0,0,0) 25%, rgba(0,0,0,0.6) 100%);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(25%,rgba(0,0,0,0)), color-stop(100%,rgba(0,0,0,0.6)));
  background: -webkit-linear-gradient(top, rgba(0,0,0,0) 25%,rgba(0,0,0,0.6) 100%);
  background: -o-linear-gradient(top, rgba(0,0,0,0) 25%,rgba(0,0,0,0.6) 100%);
  background: -ms-linear-gradient(top, rgba(0,0,0,0) 25%,rgba(0,0,0,0.6) 100%);
  background: linear-gradient(to bottom, rgba(0,0,0,0) 25%,rgba(0,0,0,0.6) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#99000000',GradientType=0 );
}
.img-title{
  position: absolute;
  left: 0;
  bottom: 45px;
  color: white;
  font-size: 20px;
  font-weight: 700;
  margin-left: 20px;
}
.img-hint{
  position: absolute;
  left: 0;
  bottom: 20px;
  color: #fff;
  font-size: 14px;
  margin-left: 20px;
}

/* .my-bullet-active{
  background: #fff;
  opacity: 1;
  width: 12px;
  height: 8px;
  border-radius: 8px;
} */
</style>
