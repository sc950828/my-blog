<template>
  <div class="wrapper">
    <div>
      状态需要加上模块名this.$store.state.user.name:
      <mark>{{this.$store.state.user.name}}</mark>
    </div>
    <div>
      状态需要加上模块名this.$store.state.product.cost:
      <mark>{{this.$store.state.product.cost}}</mark>
    </div>
    <div>
      getters不区分模块
      this.$store.getters.getCost
      <mark>{{this.$store.getters.getCost}}</mark>
    </div>
    <div>
      getters不区分模块,除非加上namespaced: true,属性这样就通过模块获取了。
      this.$store.getters['user/getName']
      <mark>{{this.$store.getters['user/getName']}}</mark>
    </div>
    <div>computed方式获取age</div>
    <div>getAge{{getAge}}</div>
    <div>
      getters 的第一个参数 state 是当前模块的 state，第二个参数是 getters，如果当前模块加上了 namespaced:true 属性，即被模块化了，这个 getters 只包括当前模块的 getters，如果想要获取到别的模块的 getters，我们需要用到第四个参数 rootGetters，这个参数包括所有模块的 getters。如果需要获取到别的模块的 state，我们需要使用第三个参数 rootState，这个参数是获取的是所有模块的 state。
      this.$store.getters.getNumber
      <mark>{{this.$store.getters.getNumber}}</mark>
    </div>

    <div>mutations</div>
    <div>
      <button @click="changeAge">changeAge</button>
      <button @click="changeNumber">changeNumber</button>
    </div>

    <div>actions</div>
    <div>
      <button @click="fullMessage">user fullMessage</button>
      <button @click="fullProduct">product fullProduct</button>
      <button @click="otherMutation">在useraction里面提交product的mutation</button>
      <button @click="otherMutationInProduct">在product action里面提交user的mutation</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  // 组件
  components: {},
  // 属性
  props: {},
  // 数据
  data() {
    return {};
  },
  // 计算属性
  computed: {
    ...mapGetters({
      getAge: "user/getAge"
    })
  },
  // 监听属性
  watch: {},
  // 方法
  methods: {
    ...mapMutations(["changeNumber"]),
    ...mapMutations({
      changeAge: "user/changeAge"
    }),
    ...mapActions({
      fullMessage: "user/fullMessage",
      otherMutation: "user/otherMutation",
      otherMutationInProduct: "otherMutationInProduct"
    }),
    ...mapActions(["fullProduct"])
  },
  // 生命周期函数 已创建
  created() {
    console.log(this.$store);
  },
  // 生命周期函数 已挂载
  mounted() {}
};
</script>
