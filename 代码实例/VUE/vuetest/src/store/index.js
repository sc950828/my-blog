import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1,
    list: []
  },
  getters: {
    total: state => {
      return state.count + 10
    }
  },
  mutations: {
    addCount: (state, step) => {
      state.count += step
    }
  },
  actions: {
    getList: (context) => {
      axios.get('https://jsonplaceholder.typicode.com/posts?userId=2').then(res => {
        context.state.list = res.data
      })
    },
    getTotal: (context, step) => {
      context.commit('addCount', step)
    }
  }
})
