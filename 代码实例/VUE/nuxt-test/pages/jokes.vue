<template>
  <div class="jokes-wrapper">
    jokes
    <nuxt-link to="/jokes?name=randy">randy</nuxt-link>
    <nuxt-link to="/jokes?name=demi">demi</nuxt-link>
    <b-button @click="nameRouter">用name进行路由跳转</b-button>
  </div>
</template>

<script>
export default {
  asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    console.log(query)
  },
  methods: {
    nameRouter() {
      this.$router.push({name: 'index', query: {name: 'name'}, params: {params: "params"}})
    }
  },
  watchQuery: ["name"]
}
</script>
