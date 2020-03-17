import { CHANGE_WEIGHT } from "./types";

export default {
  // 状态
  state: {
    name: "randy",
    age: 24,
    sex: "男",
    height: 172,
    weight: 60,
    handSome: true
  },
  // 根据state来 类似计算属性 有缓存功能
  getters: {
    getName: state => state.name.toUpperCase(),
    // 不止可以传state 还可以传getters
    getAge: (state, getters) => {
      return getters.getName + state.age;
    },
    getMySex: state => {
      return "苏纯是" + state.sex;
    },
    getHeight: state => {
      return state.height;
    },
    getMyWeight: state => {
      return state.weight;
    },
    getHandSome: state => {
      return state.handSome;
    }
  },
  // 唯一修改state值得方法，里面必须是同步方法
  mutations: {
    changeHeight(state, payload) {
      state.height += payload.name;
    },
    CHANGE_HANDSOME: state => {
      state.handSome = !state.handSome;
    },
    [CHANGE_WEIGHT]: state => {
      state.weight += 10;
    },
    changeAge(state, payload) {
      console.log(payload);
      state.age += payload.step
    }
  },

  // actions 提交mutations 可以包含异步方法
  // 参数context是一个与 store 实例具有相同方法和属性的 context 对象
  actions: {
    changeHandsome(context) {
      setTimeout(() => {
        context.commit("CHANGE_HANDSOME")
      }, 3000)
    },
    changeHeight(context, payload) {
      setTimeout(() => {
        context.commit("changeHeight", payload)
      }, 3000)
    },
    changeWeight({commit}) {
      commit(CHANGE_WEIGHT)
    }
  }
};
