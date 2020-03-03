<template>
  <div>
    <h2>vuex test</h2>
    <span>count {{count}}</span>
    <button @click="addCount(5)">add count</button>
    <span>total {{total}}</span>
    <div @click="getTotal(2)">get total</div>
    <div @click="getList">get list</div>
    <div v-for="li of list" :key="li.id">{{li.title}}</div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  export default {
    name: "VuexTest",
    data(){
      return {
        step: 5
      }
    },
    computed: {
      // count(){
      //   return this.$store.state.count
      // }

      // ...mapState(['count'])

      ...mapState({
        // count: 'count'
        // count: state => state.count
        count(state) {
          return state.count + this.step //使用this必须使用普通函数
        },
        list: 'list'
      }),

      // total() {
      //   return this.$store.getters.total
      // },

      ...mapGetters({
        total: 'total'
      }),

      // ...mapGetters([
      //   'total'
      // ])


    },
    methods: {
      ...mapMutations([
        'addCount'
      ]),
      // ...mapMutations({
      //   addCount: 'addCount'
      // }),
      // addCount(){
      //   this.$store.commit('addCount', 5)
      // },

      // getTotal() {
      //  this.$store.dispatch('getTotal', 2)
      // },
      ...mapActions({
        getTotal: 'getTotal',
        getList: 'getList'
      }),
      // ...mapActions([
      //   'getTotal'
      // ])
    }
  }
</script>

<style scoped>

</style>
