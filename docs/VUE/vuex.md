1. vuex是什么？
  Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。或者是共享数据仓库。
  如果您需要构建一个中大型单页应用，您很可能会考虑如何更好地在组件外部管理状态，Vuex 将会成为自然而然的选择，因为Vuex 的状态存储是响应式的。

2. state
  最直接的方法获取state是使用计算属性
    computed: {
      count () {
        return this.$store.state.count
      }
    }

    当需要获取多个状态的时候使用这种方法太冗余，我们可以使用mapState({})辅助函数。
    import {mapState} from 'vuex'
    computed: {
      ...mapState({
        // 箭头函数可使代码更简练
        count: state => state.count,
        count: 'count'

        // 传字符串参数 'count' 等同于 `state => state.count` 不想使用state里面的名字this.countAlias对应this.$store.state.count
        countAlias: 'count',

        // 为了能够使用 `this` 获取局部状态，必须使用常规函数
        countPlusLocalState (state) {
          return state.count + this.localCount
        }
      })
    }

    computed: {
      ...mapState(
        //当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
        [
          // 映射 this.count 为 this.$store.state.count
          'count'
        ]
      )
    }

3. getter
  getter可以简单的理解为store的计算属性，它是基于state派生出来的一些状态
  就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
  getter 接受 state 作为其第一个参数
  const store = new Vuex.Store({
    state: {
      todos: [
        { id: 1, text: '...', done: true },
        { id: 2, text: '...', done: false }
      ]
    },
    getters: {
      doneTodos: state => {
        return state.todos.filter(todo => todo.done)
      }
    }
  })
  跟state一样，我们使用this.$store.getter.doneToDos访问getter里面的属性

  你也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。
    getters: {
      getTodoById: (state) => (id) => {
        return state.todos.find(todo => todo.id === id)
      }
    }
    this.$store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }

  当有多个getter时，我们也可以使用mapGetters函数
    computed: {
      // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapGetters({
        // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
        doneCount: 'doneTodosCount'
      })
      // 或者传数组类似mapState的用法
      ...mapGetters([
        'doneTodosCount',
        'anotherGetter',
        // ...
      ])
    }

4. mutations
  唯一更改state的值的方法，mutation接收state作为第一个参数。一条重要的原则就是要记住 mutation 必须是同步函数。
  const store = new Vuex.Store({
    state: {
      count: 1
    },
    mutations: {
      increment (state) {
        // 变更状态
        state.count++
      }
    }
  })
 我们使用this.$store.commit('increment')来调用mutation,或者this.$store.commit({type: 'increment'})
 如果需要提交额外的参数，我们可以给mutation里面的方法带上额外的参数，一般我们使用一个对象。
 mutations:  {
  increment (state, payload) {
    state.count += payload.inc
  }
 }
 调用mutations
   this.$store.commit('increment', {
     inc: 10
   })
 这里也可以使用这种方式提交
   this.$store.commit({
    type: 'increment',
    inc: 10
   })
 当mutations很多的时候我们也可以使用辅助函数mapMutations()
   methods: {
      ...mapMutations([
        'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

        // `mapMutations` 也支持载荷：有参数直接在调用的地方传过来就行了
        'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
      ]),
      ...mapMutations({
        add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
      })
    }

5. actions
  Action 类似于 mutation，不同在于：Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。
  Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
  const store = new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      increment (state) {
        state.count++
      }
    },
    actions: {
      increment (context) {
        context.commit('increment')
      }
      或者利用解构 把context.commit解构为commit形参
      increment ({ commit }) {
        commit('increment')
      }
    }
  })
  我么通过this.$store.dispatch('increment')或者this.$store.dispatch({type:'increment'})来分发action，与mutations一样，同样
  支持传多个参数。
  如果有多个action我们可以使用辅助函数mapActions
    methods: {
      ...mapActions([
        'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

        // `mapActions` 也支持载荷：在调用的地方直接传递参数
        'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
      ]),
      ...mapActions({
        add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      })
    }

6. module
  由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。为了解决以上问题，
  Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、
  甚至是嵌套子模块——从上至下进行同样方式的分割
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

  注意在 Vuex 模块化中，state 是唯一会根据组合时模块的别名来添加层级的，后面的 getters、mutations 以及 actions 都是直接合并在 store 下。不需要区分模块
  this.$store.state.a.xx // -> moduleA 的状态
  this.$store.state.b.xx // -> moduleB 的状态

 7. vuex数据持久化
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
