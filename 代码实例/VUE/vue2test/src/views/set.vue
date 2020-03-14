<template>
  <div class="wrapper">
    <ul>
      <li v-for="(value, key) of obj1" :key="key">{{key + ": " + value}}</li>
    </ul>
    <div>
      <button @click="addObjProp">给obj加一个属性</button>
      <button @click="deleteObjProp">给obj减一个属性</button>
      <button @click="changeObj">彻底改变obj</button>
    </div>
    <ul>
      <li v-for="(value, index) of arr1" :key="index">{{index + ": " + value}}</li>
    </ul>
    <div>
      <button @click="addArrValue">给arr首位加一个值</button>
      <button @click="deleteArrValue">给arr首位移除一个值</button>
    </div>
    <div>
      <router-link to="/">返回</router-link>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  // 数据
  data() {
    return {
      arr1: [1, 2, 3, 4],
      obj1: {
        name: "randy",
        age: 24
      }
    };
  },
  // 方法
  methods: {
    addObjProp() {
      // 这种方法不是响应式
      // this.obj1.sex = "男"

      // 需要使用这两种方法
      // this.$set(this.obj1, "sex", "男")
      Vue.set(this.obj1, "sex", "男");
      console.log(this.obj1);
    },
    deleteObjProp() {
      // 不能直接删除 不是响应式
      // delete this.obj1.sex

      // this.$delete(this.obj1, "sex")
      Vue.delete(this.obj1, "sex");
      console.log(this.obj1);
    },
    changeObj() {
      // 重新赋值也可以 也会是响应式的
      this.obj1 = { name1: "demi", age1: 25, sex: "女" };
    },
    addArrValue() {
      // 这种方法不行 不是响应式
      // this.arr1[4] = 5

      // 需要使用这两种方法
      // this.$set(this.arr1, 4, 5)
      // Vue.set(this.arr1, 4, 5)

      // 或者使用数组的变异方法 push unshift
      this.arr1.push(5);
      this.arr1.unshift(6);
      console.log(this.arr1);
    },
    deleteArrValue() {
      // 使用delete
      // this.$delete(this.arr1, 5)
      // this.$delete(this.arr1, 0)
      // Vue.delete(this.arr1, 5)
      // Vue.delete(this.arr1, 0)

      // 或者使用数组的变异方法
      this.arr1.shift();
      this.arr1.pop();
      console.log(this.arr1);
    }
  }
};
</script>
