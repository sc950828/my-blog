export default {
  state: {
    name: 'randy',
    age: 24,
    sex: "男",
    height: 172,
    weight: 60,
    handSome: true
  },
  getters: {
    getName: state => state.name.toUpperCase(),
    // 不止可以传state 还可以传getters
    getAge: (state, getters) => {
      return getters.getName + state.age
    },
    getMySex: (state) => {
      return "苏纯是" + state.sex
    },
    getHeight: (state) => {
      return state.height
    },
    getMyWeight: (state) => {
      return state.weight
    },
    getHandSome: (state) => {
      return state.handSome
    }
  }
}
