<template>
    <h2>about component</h2>
</template>

<script>
    export default {
      name: "About",
      created() {
        console.log(this.$route.params.name)
      },
      watch: {
        $route (to, from) {
          console.log(to)
          console.log(from)
        }
      },
      beforeRouteEnter(to, from, next) {
        console.log('beforeRouteEnter')
        next()
      },
      beforeRouteUpdate(to, from, next) {
        console.log('beforeRouteUpdate')
        next()
      },
      beforeRouteLeave(to, from, next) {
        console.log('beforeRouteLeave')
        next()
      }
    }
</script>

<style scoped>

</style>
