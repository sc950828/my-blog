<template>
  <div>
    {{name | upperCase}}
    {{age | add(10)}}岁
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "randy",
      age: 24
    };
  },
  filters: {
    upperCase(value) {
      return value.toUpperCase();
    },
    add(value, step) {
      return value + step;
    }
  }
};
</script>
