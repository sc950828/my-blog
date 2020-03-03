<template>
  <div>
    <input type="text" @keyup="handleKeyUp"/><br/>
    <input type="text" @keyup="handleKeyUp($event)"/>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      handleKeyUp(event) {
        console.log(event)
      }
    }
  }
</script>
