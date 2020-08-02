<template>
  <mt-header fixed>
    <router-link to="/" slot="left">
      <v-icon name="chevron-left" scale="1.3"></v-icon>
      <!-- <mt-button icon="back"></mt-button> -->
    </router-link>
    <v-icon name="share" scale="1.3" slot="right" @click="notComplete"></v-icon>
    <!-- share-alt -->
  </mt-header>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
  name: "TopicHeader",
  methods:{
    notComplete(){
      Toast({
        message: '分享功能还未实现～',
        // position: 'top',
        // iconClass: 'icon icon-success'
        duration: 1500,
      })
    }
  }
};
</script>

<style>
.mint-header {
  height: 50px !important;
  font-size: 18px !important;
  z-index: 2 !important;
}
</style>
