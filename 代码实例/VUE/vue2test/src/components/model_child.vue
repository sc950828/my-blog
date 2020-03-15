<template>
  <div class="wrapper">
    <!-- v-model 默认把value作为值 oninput作为事件 -->
    <input type="text" :value="name" @input="updateVal"/>
  </div>
</template>

<script>
export default {
  // 修改v-model的默认属性和事件
  // 把v-model的值修改作为checked1属性的值
  // 事件修作为change事件
  model: {
    prop: "name",
    event: "changeValue"
  },
  // 属性
  props: {
    name: {
      type: String
    }
  },
  // 数据
  data() {
    return {
    };
  },
  // 方法
  methods: {
    updateVal(e) {
      this.$emit("changeValue", e.target.value)
    }
  }
};
</script>
