<template>
  <div class="wrapper">
    <div>
      <div>{{fullName}}</div>
      <div>methods的fullName {{getMyFullName()}}</div>
      <button @click="changeFirstName">changeFirstName</button>
      <button @click="changeLastName">changeLastName</button>
      <button @click="changeFullName">changeFullName</button>
      <button @click="getMyComputedFullName">getMyComputedFullName</button>
      <button @click="getMyFullName">getMyFullName</button>
    </div>
    <div>
      <router-link to="/">返回</router-link>
    </div>
  </div>
</template>

<script>
export default {
  // 数据
  data() {
    return {
      firstName: "chun",
      lastName: "su"
    };
  },
  // 计算属性
  computed: {
    // 第一种写法
    // fullName() {
    //   return this.firstName + this.lastName
    // }
    // 第二种写法 get方法是没有参数的
    fullName: {
      get() {
        console.log("computed get fullName");
        return this.firstName + this.lastName;
      },
      set(newVal) {
        console.log("computed set fullName", newVal);
        // 千万不能这样赋值 不然会进入死循环
        // this.fullName = newVal
        // 这样赋值
        newVal = newVal.split(" ");
        this.firstName = newVal[0].toUpperCase();
        this.lastName = newVal[1].toUpperCase();
      }
    }
  },
  // 监听属性
  watch: {
    firstName(newVal, oldVal) {
      console.log("newVal: ", newVal);
      console.log("oldVal: ", oldVal);
    },
    lastName(newVal, oldVal) {
      console.log("newVal: ", newVal);
      console.log("oldVal: ", oldVal);
    }
  },
  // 方法
  methods: {
    changeFirstName() {
      this.firstName = "hai";
    },
    changeLastName() {
      this.lastName = "yan";
    },
    changeFullName() {
      this.fullName = "randy su";
    },
    getMyComputedFullName() {
      console.log("getMyComputedFullName 不会进入get方法 因为依赖没变", this.fullName);
    },
    getMyFullName() {
      console.log("getMyFullName");
      return this.firstName + this.lastName;
    }
  }
};
</script>
