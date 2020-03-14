<template>
  <div class="wrapper">
    <!-- 发生了事件冒泡 -->
    <div class="parent1" @click="parent1Event($event)">
      父1
      <div class="child1" @click="child1Event">子1 点我 默认事件冒泡</div>
    </div>
    <!-- 使用事件修饰符stop阻止事件冒泡 -->
    <div class="parent2" @click="parent2Event($event)">
      父2
      <div class="child2" @click.stop="child2Event">子2 点我 stop 阻止事件冒泡</div>
    </div>

    <!-- 发生了事件捕获 -->
    <div class="parent3" @click.capture="parent3Event($event)">
      父3
      <div class="child3" @click="child3Event">子3 点我capture 设置事件为捕获</div>
    </div>

    <!-- 只发生一次 -->
    <div @click.once="myOnce">once 点我 事件只触发一次</div>

    <!-- self 自身才会触发 -->
    <div class="parent4" @click.self="parent4Event($event)">
      父4 点我才会触发事件 self
      <div class="child4" @click.self="child4Event">子4</div>
    </div>

    <!-- 阻止默认事件 -->
    <a href="https:www.baidu.com" @click.prevent="myA">阻止默认事件 prevent</a>

    <!-- 组件绑定原生事件 -->
    <LifeCycleChild @click.native="nativeClick"></LifeCycleChild>

    <!-- 按键修饰符 -->
    <input
      type="text"
      @keydown.left="myKey"
      @keydown.right="myKey"
      @keydown.up="myKey"
      @keydown.down="myKey"
      @keydown.space="myKey"
      @keydown.esc="myKey"
      @keydown.enter="myKey"
      @keydown.tab="myKey"
      @keydown.delete="myKey"
    />

    <div
      @click.ctrl="myClick"
      @click.shift="myClick"
      @click.alt="myClick"
    >配合shift 或者 ctrl 或者 alt按键 点击我</div>

    <div>v-model 事件修饰符</div>
    <input type="text" v-model.trim="value1" />
    将值转换为数字
    <input type="text" v-model.number="value2" @input="myNumber" />
    <input type="text" v-model.lazy="value3" @input="myLazy" />

    <div>
      <router-link to="/">返回</router-link>
    </div>
  </div>
</template>

<script>
import LifeCycleChild from "@/components/life_cycle_child.vue";

export default {
  components: {
    LifeCycleChild
  },
  data() {
    return {
      value1: "trim 去除空格",
      value2: "123",
      value3: "lazy 数值变化由输入时延迟到数据改变时"
    };
  },
  methods: {
    parent1Event(e) {
      console.log("parent1Event");
      console.log(e.target);
    },
    child1Event(e) {
      console.log("child1Event");
      console.log(e.target);
    },
    parent2Event(e) {
      console.log("parent2Event");
      console.log(e.target);
    },
    child2Event(e) {
      console.log("child2Event");
      console.log(e.target);
    },
    parent3Event(e) {
      console.log("parent3Event");
      console.log(e.target);
    },
    child3Event(e) {
      console.log("child3Event");
      console.log(e.target);
    },
    myOnce() {
      alert("once");
    },
    parent4Event(e) {
      console.log("parent4Event");
      console.log(e.target);
    },
    child4Event(e) {
      console.log("child4Event");
      console.log(e.target);
    },
    myA() {
      console.log("我用prevent阻止了默认事件 a链接的跳转");
    },
    nativeClick() {
      console.log(
        "组件绑定点击事件能触发吗,不能，但是我加上了native 就可以触发啦"
      );
    },
    myKey(e) {
      console.log(e.code);
    },
    myClick(e) {
      console.log(e);
    },
    myNumber() {
      console.log(
        "默认输入框的值类型是字符串 加number修饰符会转换为数字",
        typeof this.value2
      );
    },
    myLazy() {
      console.log(this.value3);
    }
  }
};
</script>
<style lang="css">
.parent1 {
  width: 400px;
  height: 100px;
  background-color: aqua;
}
.child1 {
  width: 300px;
  height: 50px;
  background-color: bisque;
}

.parent2 {
  width: 400px;
  height: 100px;
  background-color: brown;
}
.child2 {
  width: 300px;
  height: 50px;
  background-color: chocolate;
}

.parent3 {
  width: 400px;
  height: 100px;
  background-color: aqua;
}
.child3 {
  width: 300px;
  height: 50px;
  background-color: chocolate;
}

.parent4 {
  width: 400px;
  height: 100px;
  background-color: brown;
}
.child4 {
  width: 300px;
  height: 50px;
  background-color: chocolate;
}
</style>
