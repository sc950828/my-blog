<template>
  <div>
    <span v-text="text"></span>
    <input type="text" v-model="text"/><br/>
    <button @click="destroyVm">销毁</button><!-- destroyVm 或者destroyVm($event)都可以获取event实例-->
  </div>
</template>
<script>
  export default {
    data() {
      return {
        text: 'hello'
      }
    },
    methods: {
      destroyVm(event) {
        console.log(event)
        this.$destroy()
      }
    },
    beforeCreate() {
      console.log(this)
      console.log("beforeCreate")
    },
    created() {
      console.log(this)
      console.log("created")
    },
    beforeMount() {
      console.log(this)
      console.log("beforeMount")
    },
    mounted() {
      console.log(this)
      console.log("mounted")
    },
    beforeUpdate() {
      console.log("beforeUpdate")
    },
    updated() {
      console.log("updated")
    },
    beforeDestroy() {
      console.log("beforeDestroy")
    },
    destroyed(){
      console.log("destroyed")
    }
  }
</script>
