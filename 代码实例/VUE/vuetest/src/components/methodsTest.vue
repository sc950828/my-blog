<template>
  <div id="computed">
    <button v-on:click="age++">age点击</button>
    <button v-on:click="name++">name点击</button>
    <!-- <p @click="showAge()">age</p>
    <p @click="showName()">name</p> -->
    <p>age : {{ showAge() }}</p>   <!-- 函数在{{}}里面的时候触发一个方法 所有在这{{}}里面的方法都会执行-->
    <p>name : {{ showName() }}{{c()}}</p>
  </div>
</template>
    <script>
        export default {
          data() {
            return {
              name: 15,
              age: 5,
            }
          },
          methods: {
            showAge () {
                console.log('age');
                return this.age;
            },
            showName () {
                console.log('name')
                return this.name;
            },
            a () {
                console.log('a')
            },
            b () {
                console.log('b')
            },
            c () {
                console.log('c')
            }
          }
      }
</script>