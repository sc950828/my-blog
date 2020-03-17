export default {
  namespaced: true,
  state: {
    name: "randy",
    age: 24
  },
  getters: {
    getName(state) {
      return state.name;
    },
    getAge(state, getters, rootState, rootGetters) {
      console.log("user state", state);
      console.log("user getters", getters);
      console.log("user rootState", rootState);
      console.log("user rootGetters", rootGetters);
      return state.age;
    }
  },
  mutations: {
    changeAge(state) {
      console.log(state);
      state.age = 25;
    }
  },
  actions: {
    fullMessage(context) {
      console.log("user context", context);
      context.commit("changeAge");
    },
    otherMutation(context) {
      context.commit("changeNumber", null, { root: true });
    }
  }
};
