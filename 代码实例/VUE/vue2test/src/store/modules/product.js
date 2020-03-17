export default {
  state: {
    cost: 99,
    number: 5
  },
  getters: {
    getCost(state) {
      return state.cost + 1;
    },
    // 没有加命名空间的store getters默认是全局的getters
    getNumber(state, getters, rootState, rootGetters) {
      console.log("product state", state);
      console.log("product getters", getters);
      console.log("product rootState", rootState);
      console.log("product rootGetters", rootGetters);
      return getters.getCost * state.number;
    }
  },
  mutations: {
    changeNumber(state) {
      console.log("product mutations", state);
      state.number = 6;
    }
  },
  actions: {
    fullProduct(context) {
      console.log("product context", context);
      context.commit("changeNumber");
    },
    otherMutationInProduct(context) {
      context.commit("user/changeAge");
    }
  }
};
