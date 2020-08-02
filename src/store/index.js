import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    title: 'hhh'
  },
  getters:{
    getTitle: function(state){
      return state;
    }
  },
  mutations:{
    setTitle(state, title){
      state.title = title;
    }
  },
  actions:{
    addFun(context){
      context.commit('add');
    }
  }
})

export default store
