<template>
  <!-- header -->
    <mt-header fixed title="知乎日报">
      <!-- <a href="/" slot="left"> -->
      <!-- <v-icon name="bars" @click="showSidebar" scale="1.3" slot="left"></v-icon> -->
      <!-- <mt-button icon="back">返回</mt-button> -->
      <div slot="left" id="header-left">
        <p class="day">{{day}}</p>
        <p class="month">{{month}}</p>
      </div>

      <!-- <mt-button icon="more" slot="right"></mt-button> -->
      <v-icon name="user-circle" scale="1.5" slot="right" @click="notComplete"></v-icon>
      <div class="rIcon">hhh</div>
    </mt-header>
</template>

<script>
// import moment from 'moment'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 按需加载
import { Toast } from 'mint-ui';

export default {
  name: 'Header',
  data: function(){
    return{
      month: 1,
      day: 1
    }
  },
  mounted(){
    // moment.locale('zh-cn');
    // let time = new Date().getTime();
    // this.month = moment(time).format("MMMM");  //'三月'
    // this.day = moment(time).format("Do").slice(0,-1);  //去掉'22日'的'日'

    let time = new Date().getTime();
    this.month = dayjs(time).locale('zh-cn').format("MMMM");
    this.day = dayjs(time).format("DD");
  },
  methods: {
    // showSidebar(){
    //   this.$emit('changeSidebarVisibility')
    //   // console.log("showSidebar")
    // },
    notComplete(){
      console.log(this.$root.baseData);
      Toast({
        message: '登录功能还未实现～',
        // position: 'top',
        // iconClass: 'icon icon-success'
        duration: 1500,
      })
    }
  }
}
</script>

<style>
.mint-header{
  height: 50px !important;
  font-size: 22px !important;
  background-color: #fff;
  color: #000;
}
.mint-header-title{
  font-weight: 700;
}

#header-left{
  width: 50px;
  border-right: 1px solid #ccc;
  text-align: center;
  margin-left: -10px;
}
#header-left p.day{
  font-weight: 700;
}
#header-left p.month{
  margin-top: 3px;
  font-size: 14px;
  color: #8590a6;
}
</style>