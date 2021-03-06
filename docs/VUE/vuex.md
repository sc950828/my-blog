## vuex 文档

[vuex 中文官方文档](https://vuex.vuejs.org/zh/)

## vuex 是什么？

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。或者是共享数据仓库。如果您需要构建一个中大型单页应用，您很可能会考虑如何更好地在组件外部管理状态，Vuex 将会成为自然而然的选择，因为 Vuex 的状态存储是响应式的。

## state

状态

- 定义

```js
new Vuex.Store({
  state: {
    name: "randy",
  },
});
```

- 获取方式
  - 通过 `this.$store.state.xxx` 直接获取
  - 在 computed 里面通过计算属性获取
  - 通过 mapState()函数获取。有数组对象别名方法自定义方法四种方式。

```js
// state可以通过计算属性 state 或者 mapState获取
computed: {
  myComputedName() {
    return this.$store.state.name
  },
  // 数组方式
  ...mapState(
    ['name', 'age']
  ),
  // 对象方式
  ...mapState({
    myHeight: "height",
    weight: state => state.weight + "kg",
    isHandSome(state) {
      return this.msg1 + (state.handSome ? "很帅" : "很丑")
    }
  })
}
```

## getter

getter 可以简单的理解为 store 的计算属性，它是基于 state 派生出来的一些状态，就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

- 定义

```js
new Vuex.Store({
  getters: {
    myName: (state) => state.name,
    ageAndName: (state, getters) => getters.myName + state.age,
  },
});
```

- 获取方式

  - 直接通过 this.\$store.getters.xxx 获取
  - 在 computed 里面通过计算属性获取
  - 在 computed 里面通过 mapGetters()函数获取。只有数组和对象别名两种方式

- 注意
  - 不能修改 getters 里面的值

```js
computed: {
  getAge() {
    return this.$store.getters.getAge
  },
  ...mapGetters(
    ["getMySex"]
  ),
  ...mapGetters({
    myWeight: "getMyWeight"
  })
}
```

## mutations

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数。
一条重要的原则就是要记住 mutation 必须是同步函数。
通过 commit 提交 mutations。

- 定义

```js
new Vuex.Store({
  mutations: {
    changeHeight(state, payload) {
      state.height += payload.name;
    },
    CHANGE_HANDSOME: (state) => {
      state.handSome = !state.handSome;
    },
    [CHANGE_WEIGHT]: (state) => {
      state.weight += 10;
    },
    changeAge(state, payload) {
      console.log(payload);
      state.age += payload.step;
    },
  },
});
```

- 调用方式
  - 直接通过`this.$store.commit()`的方式提交。
  - 通过在 methods 里面通过 mapMutations()辅助函数获取。只有数组和对象别名两种方式

```js
commitHeightMutation() {
  this.$store.commit("changeHeight", { name: "苏纯" });
},
...mapMutations(["CHANGE_HANDSOME"]),
...mapMutations({
  changeWeight: "CHANGE_MY_WEIGHT"
}),
changeMyAge() {
  this.$store.commit({
    type: "changeAge",
    step: 10
  });
}
```

## actions

Action 类似于 mutation，不同在于：Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。

- 定义

```js
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
```

- 调用方式
  - 直接通过`this.$store.dispath()`的方式提交。
  - 通过在 methods 里面通过 mapActions()辅助函数获取。只有数组和对象别名两种方式

```js
changeHandsomeAction() {
  // this.$store.dispatch("changeHandsome")
  this.$store.dispatch({type: "changeHandsome"})
},
...mapActions(
  ["changeHeight"]
),
changeHeightAction() {
  // 需要传递参数 调用方法传参
  this.changeHeight({name: 'demi'})
},
...mapActions({
  changeMyWeight: "changeWeight"
})
```

## module

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter。

```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
```

注意在 Vuex 模块化中，state 是唯一会根据组合时模块的别名来添加层级的，后面的 getters、mutations 以及 actions 都是直接合并在 store 下。不需要区分模块。

- state

  - `this.$store.state.a.xx` -> moduleA 的状态
  - `this.$store.state.b.xx` -> moduleB 的状态

- getters

  - 如果需要 getters mutations actions 也根据模块命名，我们需要在模块里面加上 namespaced:true 属性就可以了。我们获取的时候通过 `this.$store.getters[module/getterName]`获取到 getters 值。getters 的第一个参数 state 是当前模块的 state，第二个参数是 getters，如果当前模块加上了 namespaced:true 属性，即被模块化了，这个 getters 只包括当前模块的 getters，如果想要获取到别的模块的 getters，我们需要用到第四个参数 rootGetters，这个参数包括所有模块的 getters。如果需要获取到别的模块的 state，我们需要使用第三个参数 rootState，这个参数是获取的是所有模块的 state。

- mutations
  mutations 里面的 state 默认是当前模块的

- actions
  actions 里面的 context 对象有 state rootState getters rootGetters 等属性，如果没有设置 namespaced:true，getters 和 rootGetters 会是相同的。
  默认在 action 里面可以提交其他模块的 mutations/actions，但是设置了 namespaced:true 后我们的 actions 只能提交本地的 mutations/actions，如果要提交外部模块的 mutations/actions 需要在 commit/dispatch 的时候传递第三个参数{root: true}

## vuex 数据持久化

    第一种可以使用localStorage或者sessionStorage备份一份，然后再取得时候先取state取不到再去storage中取
    第二种使用插件 vuex-persistedstate
      首先安装 npm install vuex-persistedstate -D
      然后在创建vuex的时候加进去
      import createPersistedState from "vuex-persistedstate"
      const store = new Vuex.Store({
        // ...
        plugins: [createPersistedState()]
      })

    默认把state存储到localStorage，可以自定义配置到sessionStorage中或cookie中
    const store = new Vuex.Store({
      // ...
      plugins: [createPersistedState({storage: window.sessionStorage})]
    })

    默认持久化所有的state，如果有选择可以使用
    const store = new Vuex.Store({
      // ...
      plugins: [createPersistedState({
        storage: window.sessionStorage，
        reducer(val) {
           return {
            // 只储存state中的user
            user: val.user
          }
         }
      })]
    })

## 严格模式

- 开启严格模式，仅需在创建 store 的时候传入 strict: true。
- 在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。

```js
const store = new Vuex.Store({
  // ...
  strict: true,
});
```

- 不要在发布环境下启用严格模式！严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失。

```js
const store = new Vuex.Store({
  // ...
  strict: process.env.NODE_ENV !== "production",
});
```

## vuex 常见问题

### 为什么 Vuex 的 mutation 中不能做异步操作？

Vuex 中所有的状态更新的唯一途径都是 mutation，异步操作通过 Action 来提交 mutation 实现，这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

### vuex 的 action 有返回值吗？返回的是什么？

store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise

Action 通常是异步的，要知道 action 什么时候结束或者组合多个 action 以处理更加复杂的异步流程，可以通过定义 action 时返回一个 promise 对象，就可以在派发 action 的时候就可以通过处理返回的 Promise 处理异步流程
