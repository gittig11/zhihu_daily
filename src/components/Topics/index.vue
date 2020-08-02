<template>
  <div class="topics">
    <ul class="topic-container">
      <li class="topic-title" v-for="item in stories" :key="item.id">
        <!-- <img :src="item.images" alt=""> -->
        <img v-lazy="item.images[0]" alt="">
        <div class="text">
          <!-- <p class="title">{{item.title}}</p> -->
          <router-link :to="'/news/'+item.id" tag="p" class="title">
            {{item.title}}
          </router-link>
          <p class="hint">{{item.hint}}</p>
        </div>
      </li>
    </ul>

    <!-- <router-link to="/Swiper">
      hhh
    </router-link>
    <router-view></router-view> -->
  </div>
</template>

<script>
export default {
  name: 'Topics',
  data () {
    return {
      stories: [],
      // baseURL: "http://144.202.120.104:3000",
      // baseURL: "",
      // "http://localhost:3000",
    }
  },
  created () {
    this.getNews()
  },
  methods: {
    getImage(url){
      // console.log(url);
      if(url !== undefined){
        return url.replace(/http\w{0,1}:\/\/p/g,'https://images.weserv.nl/?url=p');
      }
    },
    getNews () {
      return this.axios.get(this.$root.baseURL+`/api/4/news/latest`).then(res => {
        // console.log(res.data)
        // console.log(res.data.stories)
        this.stories = res.data.stories
        // console.log('getNews');
      })
    },
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
li{
  list-style: none;
}


.topic-title{
  height: 100px;
}
.topic-title img{
  width: 80px;
  height: 80px;
  margin: 10px 10px 0 10px;
  float: left;
}
.text{
  height: 100px;
  padding-top: 10px;
}
p.title{
  font-weight: 600;
  line-height: 1.5em;
  margin-right: 5px;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
p.hint{
  color: #8590a6;
  font-size: 14px;
  margin-top: 10px;
}
</style>