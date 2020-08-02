<template>
  <div>
    <TopicHeader/>

    <div class="main-wrap" id="main-wrap">
      <div class="headline">
        <div class="img-wrap">
          <h1 class="headline-title">{{story.title}}</h1>
          <span class="img-source">图片：{{story.image_source}}</span>
          <img v-lazy="story.image" alt="">
          <div class="img-mask"></div>
        </div>
      </div>
      
      <div class="content-inner">
         <div v-html="story.body"></div>
         <!-- <div v-html="getImage(story.body)"></div> -->
      </div>
    </div>

    <remote-css :href="cssurl"></remote-css>

    <!-- <div class="footer">
      <a href="http://www.zhihu.com">知乎网</a>
       · © 2019 知乎
    </div> -->
  </div>
</template>

<script>
// import image403 from '../../utils/image403'
import TopicHeader from '../TopicHeader'

export default {
  data () {
    return {
      story: {},
      cssurl: '',
      // baseURL: "http://144.202.120.104:3000",
      // baseURL: "",
      // "http://localhost:3000",
    }
  },
  components: {
    TopicHeader,
    'remote-css': {
      render: function(createElement){
        return createElement('link', { 
          attrs: { 
            rel: 'stylesheet', 
            href: "https://daily.zhihu.com/css/share.css?v=5956a",
            type: "text/css"
          }
        })
      },
      props: {
        href: {
          type: String,
          required: true,
        },
      },
    },
  },
  created () {
    this.getNews()
    // this.$store.commit('setTitle', this.story.title);
  },
  methods: {
    getImage(url){
      // console.log(url);
      if(url !== undefined){
        return url.replace(/http\w{0,1}:\/\/p/g,'https://images.weserv.nl/?url=p');
      }
    },
    getNews () {
      return this.axios.get(this.$root.baseURL+`/api/4/news/${this.$route.params.id}`).then(res => {
        // console.log(res);
        if (res.status === 200) {
          this.story = res.data
          this.cssurl = this.story.css[0]
          // console.log(this.story)
          // console.log(this.cssurl)
        }
      })
    },
  }
}
</script>

<style>
/*
.main-wrap{
  max-width: 600px;
  min-width: 300px;
  margin: 0 auto;
}
.img-wrap{
  position: relative;
  父元素相对定位
  max-height: 375px;
  控制图片的最大高度不超过375px
  overflow: hidden;
}*/
#main-wrap{
  margin-top: 50px;
}
.main-wrap{
  max-width: 800px !important;
  /* max-width 配合 margin:0 auto; 实现居中效果 */
}
</style>
