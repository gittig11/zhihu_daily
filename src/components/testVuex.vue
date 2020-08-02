<template>
  <div>{{ count1 }}</div>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex';

export default {
  name:'TestVuex',
  data(){
    return {
      count: 10
    }
  },
  computed:{
    ...mapState({
      count1: state => state.count
    })
  }
}
</script>

<style>

</style>