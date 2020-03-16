<template>
  <div class="wrapper">
    <div>state</div>
    <div>通过如下三种方式获取的都是响应式的</div>
    <div>this.$store.state.name得到 {{this.$store.state.name}}</div>
    <div>this.$store.getters.getName得到 {{this.$store.getters.getName}}</div>
    <div>通过计算属性获取的也是响应式的</div>
    <div>myComputedName = this.$store.state.name得到 {{myComputedName}}</div>
    <mark>通过这种赋值的方式不是响应式的</mark>
    <div>myName = this.$store.state.name得到 {{myName}}</div>
    <!-- mapState -->
    <div>通过mapState获取{{name + " : " + age + "height:" + myHeight + "高度" + weight + isHandSome}}</div>
    <div>
      <button @click="changeName">改变state里面的name</button>
    </div>

    <div>getters</div>
    <div>直接通过this.$store.getters.getAge获取{{this.$store.getters.getAge}}</div>
    <div>通过computed计算属性获取getAge{{getAge}}</div>
    <div>通过mapGetters获取getMySex{{getMySex}}</div>
    <div>通过mapGetters获取myWeight{{myWeight}}</div>
    <div>
      <button @click="changeAge">改变getters里面的getAge, 会报错，get里面的数据不能被修改</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  // 组件
  components: {},
  // 属性
  props: {},
  // 数据
  data() {
    return {
      msg1: "苏纯",
      myName: ""
    };
  },
  // 计算属性
  computed: {
    // state可以通过计算属性 state 或者 mapState获取
    myComputedName() {
      return this.$store.state.name;
    },
    // 数组方式
    ...mapState(["name", "age"]),
    // 对象方式
    ...mapState({
      myHeight: "height",
      weight: state => state.weight + "kg",
      isHandSome(state) {
        return this.msg1 + (state.handSome ? "很帅" : "很丑");
      }
    }),

    // 获取getters
    getAge() {
      return this.$store.getters.getAge;
    },
    // 数组方式
    ...mapGetters(["getMySex"]),
    // 对象方式
    ...mapGetters({
      myWeight: "getMyWeight"
    })
  },
  // 监听属性
  watch: {},
  // 方法
  methods: {
    changeName() {
      this.$store.state.name = "demi";
    },
    changeAge() {
      this.$store.getters.getAge = 25;
    }
  },
  // 生命周期函数 已创建
  created() {
    console.log(this.$store);
    this.myName = this.$store.state.name;
  }
};
</script>
