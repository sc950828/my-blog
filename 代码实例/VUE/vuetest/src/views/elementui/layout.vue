<template>
  <div class="container" ref="container">
    <!-- 总结就是按屏幕的长度来的 而不是el-row -->
    <el-row class="row">
      <el-col :xs="24" :sm="12" :md="8" :lg="6">test1</el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="6">test2</el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="6">test3</el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="6">test4</el-col>
    </el-row>
    <span>{{name}}</span>
    <el-button v-on:click="updateName">update</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "randy"
    };
  },
  methods: {
    updateName() {
      this.name = "demi";
    }
  },
  beforeCreate() {
    console.log("beforeCreate:" + this.$refs.container);
    console.log("name:" + this.name);
  },
  created() {
    console.log("created:" + this.$refs.container);
    console.log("name:" + this.name);
  },
  beforeMount() {
    console.log("beforeMount:" + this.$refs.container);
  },
  mounted() {
    console.log("mounted:" + this.$refs.container);
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  destoryed() {
    console.log("destoryed");
  }
};
</script>

<style>
.container {
  padding: 20px; /*故意加的padding*/
}
.row {
  height: 20px;
  background-color: #99a9bf;
}
</style>
