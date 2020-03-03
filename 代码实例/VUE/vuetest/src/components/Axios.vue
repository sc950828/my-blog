<template>
  <div>
    <h2>axios component</h2>
    <div @click="get">get</div>
    <div @click="post">post</div>
    <div @click="put">put</div>
    <div @click="deleted">deleted</div>
    <div @click="all">all</div>
    <div @click="get3()">get能传data吗</div>
  </div>
</template>

<script>
    export default {
      name: "Axios",
      methods: {
        get() {
          this.$axios({
            methods: 'get',
            // url: 'https://jsonplaceholder.typicode.com/posts?userId=1',
            url: 'https://jsonplaceholder.typicode.com/posts',
            params: {
              userId: 1
            },
            transformRequest: [function(data) {
              console.log(data)
              return data
            }],
            transformResponse: [function(data) {
              data = 'ok' //接口实际返回的是真实数据，这里被转换了，在then里面得到的是ok
              return data
            }]
          }).then(res => {
            console.log(res.data)
          })
        },
        post() {
          this.$axios.post('https://jsonplaceholder.typicode.com/posts', {id: 1, name: 'randy'}).then(res => {
            console.log(res.data)
          })
        },
        put() {
          this.$axios.put('https://jsonplaceholder.typicode.com/posts/1', {id: 1, name: 'demi'}).then(res => {
            console.log(res.data)
          })
        },
        deleted() {
          this.$axios.delete('https://jsonplaceholder.typicode.com/posts/1').then(res => {
            console.log(res.data)
          })
        },
        get1() {
          return this.$axios.get('https://jsonplaceholder.typicode.com/posts?userId=1')
        },
        get2() {
          return this.$axios.get('https://jsonplaceholder.typicode.com/posts?userId=2')
        },
        all() {
          this.$axios.all([this.get1(), this.get2()]).then(this.$axios.spread((get1, get2) => {
            console.log(get1)
            console.log(get2.data)
          }))
        },

        get3() {
          return this.$axios.get('https://jsonplaceholder.typicode.com/posts?userId=3',{name: 'randy'})
        }
      }
    }
</script>

<style scoped>
  div {
    cursor: pointer;
  }
</style>
