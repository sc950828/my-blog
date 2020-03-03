<template>
  <div>
    <h2>home component</h2>
    <router-link to="/contact">contact</router-link>
    <router-link to="/home/about">about</router-link>

    <router-view></router-view>
  </div>
</template>

<script>
    export default {
      name: "Home",
      //获取数据的两种方法 在created方法和beforeRouteEnter
      created() {
        this.$axios.get('https://jsonplaceholder.typicode.com/todos/1').then(res => {
          console.log(res.data)
        })
        console.log(this.$children)
      },
      beforeRouteEnter(to, from, next) {
        next(vm => {
          vm.$axios.get('https://jsonplaceholder.typicode.com/todos/1').then(res => {
            console.log(res.data)
          })
        })
      }
    }
</script>

<style scoped>

</style>
