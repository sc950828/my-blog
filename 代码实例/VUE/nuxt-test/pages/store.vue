<template>
  <div class='wrapper'>store

    <div>
      state
      {{$store.state.counter}}
    </div>
    <div>
      getter
      {{$store.getters.getCounter}}
    </div>
    <b-button @click="increment">increment</b-button>
    <b-button @click="decrement">decrement</b-button>

    <div>age
      {{$store.state.user.age}}
    </div>
    <b-button @click="addAge">addAge</b-button>
    <b-button @click="deAge">deAge</b-button>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: '',
  components: {},
  // 数据
  data() {
    return {}
  },
  fetch({store}) {
    store.commit("increment")
  },
  // 方法
  methods: {
    ...mapMutations({
      increment: "increment",
      decrement: "decrement",
      addAge: "user/increment",
      deAge: 'user/decrement'
    })
  },
  // 生命周期函数 已创建
  created() {},
  // 生命周期函数 已挂载
  mounted() {},
}
</script>

<style lang='less' scoped>
.wrapper {}
</style>
