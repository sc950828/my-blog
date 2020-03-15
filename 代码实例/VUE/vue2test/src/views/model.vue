<template>
  <div class='wrapper'>
    <ModelChild v-model="name"></ModelChild>
    <div>
      <button @click="getVal">获取值</button>
    </div>
  </div>
</template>

<script>
import ModelChild from '@/components/model_child';

// 从官网上看到，v-model在内部为不同的输入元素使用不同的属性并抛出不同的事件：
// text和textarea元素使用value属性和input事件
// checkbox和radio使用checked属性和change事件
// select使用value和change事件
export default {
  // 组件
  components: {
    ModelChild
  },
  // 属性
  props: {},
  // 数据
  data() {
    return {
      name: "randy"
    }
  },
  // 方法
  methods: {
    getVal() {
      alert(this.name)
    }
  }
}
</script>
