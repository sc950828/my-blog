<template>
  <div>
    <ul>
      <li :key="item.name" v-for="item in items">{{item.name}}</li>
    </ul>
    <ul>
      <li :key="item.name" v-for="item of items">{{item.age}}</li>
    </ul>
    <ul>
      <li :key="item.name" v-for="(item, index) in items">{{index + ':' + item.name}}</li>
    </ul>
    <ul>
      <li :key="item.name" v-for="(item, index) of items">{{index + ':' + item.age}}</li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        items: [{name: 'randy', age: 12}, {name: 'demi', age: 24}]
      }
    },
    methods: {
      handleKeyUp(event) {
        console.log(event)
      }
    }
  }
</script>
