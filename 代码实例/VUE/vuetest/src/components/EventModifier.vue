<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <button type="submit">提交表单</button>
    </form>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      handleSubmit(event) {
        console.log(event)
        console.log("submit")
      }
    }
  }
</script>
