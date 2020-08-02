<template>
  <div class="container">
    <Header/>
    <!-- <Header @changeSidebarVisibility="toggleSidebar"/> -->

    <!-- <Swiper/>
    <Topics/> -->

    <!-- sidebar -->
    <!-- <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      position="left">
      <div class="mask">
        <div class="sidebar">
          <div class="header">header</div>
          <div class="home-page active" @click="toggleSidebar">
            <v-icon name="home"></v-icon>
            <span>主页</span>
          </div>
        </div>
      </div>
    </mt-popup> -->

    <scroller 
      :on-refresh="refresh"
      :on-infinite="infinite"
      ref="myscroller"
    >
      <Swiper ref="swiper"/>
      <!-- <Share/> -->
      <Topics ref="topics"/>

      <div class="topic-before" v-for="items in beforeTopics" :key="items.beforeTopics[0].id">
        <div class="date">{{ items.date || "3月15日"}}</div>
        <!-- <div class="date">{{ date || "3月15日"}}</div> -->
        <ul class="topic-container">
          <li class="topic-title" v-for="item in items.beforeTopics" :key="item.id">
            <!--200706
            这样写才不会报错！
            v-if="item.images && item.images.length>0"
            -->
            <img v-if="item.images && item.images.length>0" v-lazy="item.images[0]" alt="">
            <div class="text">
              <router-link :to="'/news/'+item.id" tag="p" class="title">
                {{item.title}}
              </router-link>
              <p class="hint">{{item.hint}}</p>
            </div>
          </li>
        </ul>
      </div>
    </scroller>
  </div>
</template>

<script>
// import Share from './Share'
import Header from './Header'
import Swiper from './Swiper'
import Topics from './Topics'
// import moment from 'moment'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 按需加载

export default {
  name: 'Home',
  components: {
    // Share,
    Header,
    Swiper,
    Topics
  },
  data () {
    return {
      // popupVisible: false,
      beforeTopics: [],
      dateStr: "",  //"20200316"
      date: "", //"3月15日"
      times: 0,
      // baseURL: "http://144.202.120.104:3000",
      // baseURL: "",
      // "http://localhost:3000",
    }
  },
  mounted: function () {
    //今日日期 "20200316"
    this.dateStr = new Date().toJSON().substring(0,10).replace(/-/g,'');
  },
  methods: {
    // toggleSidebar () {
    //   console.log("toggleSidebar")
    //   this.popupVisible = !this.popupVisible
    // },
    refresh: function () {
      console.log('refresh');
      var self=this;
      setTimeout(function(){
        self.$refs.myscroller.finishPullToRefresh();//停止下拉刷新动效
        //只需要更新topics和Swiper
        self.$refs.topics.getNews();
        self.$refs.swiper.getList();
      },1000)
    },
    infinite: function () {
      // console.log('infinite');
      setTimeout(()=>{
        this.$refs.myscroller.finishInfinite(true);
        //停止上拉加载的动效，出现没有“"没有更多数据了”的提示，
        //true：没有更多数据，false：还有数据
      },1000)

      // 更新dateStr和times
      this.updateDateStr(this.times);
      this.times += 1;
      //更新date
      this.updateDate();

      //更新beforeTopics
      this.update (this.dateStr);
    },
    updateDateStr(times){ // 更新dateStr
      let time = new Date().getTime();
      time -= times*24*60*60*1000;
      this.dateStr = new Date(time).toJSON().substring(0,10).replace(/-/g,''); //"20200315"
      // console.log(this.dateStr);
    },
    updateDate(){ //更新date
      let time = new Date().getTime();
      time -= this.times*24*60*60*1000;
      // moment.locale('zh-cn');
      // this.date = moment(time).format("MMMDo");
      this.date = dayjs(time).locale('zh-cn').format("MMMDD")+'日';
    },
    update (dateStr) { //加载更多
      return this.axios.get(this.$root.baseURL+`/api/4/news/before/`+dateStr).then(res => {
        // console.log(res.data)

        // 把日期也存入beforeTopics数组，这样div.date不会受到上拉刷新影响不断改变
        let obj = {};
        // moment.locale('zh-cn');
        // obj.date = moment(res.data.date).format("MMMDo")
        obj.date = dayjs(res.data.date).locale('zh-cn').format("MMMDD")+'日'

        obj.beforeTopics = res.data.stories
        this.beforeTopics.push(obj)
        console.log(this.beforeTopics)
      })
    },
  },
}
</script>

<style>
.date{
  color: #8590a6;
  font-size: 18px;
  margin-left: 10px;
  line-height: 2em;
}

/* .mint-popup{
  height: 100%;
} */
.mask{
  background: rgba(0,0,0,0.5);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
}
.sidebar{
  background: #fff;
  width: 300px;
  height: 100%;
  font-size: 18px;
  overflow: scroll;
}
.sidebar .header{
  height: 100px;
  background: #00a2ed;
  color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.sidebar .home-page{
  color: #00a2ed;
  height: 50px;
  padding-left: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.sidebar .home-page.active {
  background: #f0f0f0;
}
.sidebar .home-page span{
  margin-left: 5px;
}

._v-container{
  margin-top: 50px !important;  /* 给首页Swiper上方的Header留出空白 */
  background-color: #f3f3f3;  /* 设置背景颜色 */
}
.topics, .topic-before{
  max-width: 800px;
  margin: 0 auto;  /* 居中 */
}
.topic-title{
  background-color: white;  /* 设置背景颜色，结合margin实现Card效果 */
  margin: 10px 10px 0;
}
.date{
  margin-top: 10px;
}
</style>
