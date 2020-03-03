<template>
  <div>
    <h2>watch</h2>
    <h3 v-if="false">v-if</h3>
    <h3 v-show="false">v-show</h3>
  </div>
</template>

<script>
    export default {
      name: "Home",
      //获取数据的两种方法 在created方法和beforeRouteEnter
      created() {
        this.$watch('b', function(newValue, oldValue) {
          console.log(oldValue)
          console.log(newValue)
          console.log(this.$parent)
        })
        this.a = 24
        this.b = 50
        console.log(this.$data.a)
      },
      data () {
        return {
          a: 12,
          b: 25
        }
      },
      watch: {
        a: (newValue, oldValue,) => {
          console.log(oldValue)
          console.log(newValue)
        }
      }
    }
</script>

<style scoped>

</style>
