<template>
  <div class="wrapper">
    <div>
      <input type="text" v-focus v-model="val" />
    </div>
    <div style="position:relative;height:100px;">
      <div v-fixed:left="200">我是全局注册的指令</div>
    </div>
    <div>
      <button @click="changeValue">改变输入框的值</button>
    </div>
    <div>
      <router-link to="/">返回</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: "自定义指令"
    };
  },
  // 自定义指令
  directives: {
    // 除了 el 之外，其它参数都应该是只读的，切勿进行修改。
    // el 是被绑定指令的元素
    // binding 包含了指令的一些信息 重要的是arg和value属性 是我们传的参数和值
    // newVnode 新虚拟节点
    // oldVnode 老虚拟节点 只在update和componentUpdate生命周期函数中才会有
    focus: {
      // 只调用一次 指令绑定到该元素时调用 做一些初始化工作
      bind: function(el, binding, newVnode) {
        console.log("bind");
        console.log(el);
        console.log(binding);
        console.log(newVnode);
      },
      // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
      inserted(el, binding, newVnode) {
        console.log("inserted");
        console.log(el);
        console.log(binding);
        console.log(newVnode);
        el.focus();
      },
      // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。
      update(el, binding, newVnode, oldVnode) {
        console.log("update");
        console.log(el);
        console.log(binding);
        console.log(newVnode);
        console.log(oldVnode);
      },
      // 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
      componentUpdated(el, binding, newVnode, oldVnode) {
        console.log("componentUpdated");
        console.log(el);
        console.log(binding);
        console.log(newVnode);
        console.log(oldVnode);
      },
      // 只调用一次，指令与元素解绑时调用。
      unbind(el, binding, newVnode) {
        console.log("unbind");
        console.log(el);
        console.log(binding);
        console.log(newVnode);
      }
    }
  },
  methods: {
    changeValue() {
      const randomVal = Math.trunc(Math.random() * 10);
      this.val = "hello randy" + randomVal;
    }
  }
};
</script>
