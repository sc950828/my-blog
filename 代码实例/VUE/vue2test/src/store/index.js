import Vue from "vue";
import Vuex from "vuex";
// import mode1 from "./mode1";
import user from "./modules/user";
import product from "./modules/product";

Vue.use(Vuex);

// 单个store对象
// const store = new Vuex.Store(mode1);

// 模块化的store
const store = new Vuex.Store({
  state: {
    isRoot: true
  },
  getters: {
    getIsRoot(state) {
      return state.isRoot
    }
  },
  modules: {
    user,
    product
  }
})

export default store;
