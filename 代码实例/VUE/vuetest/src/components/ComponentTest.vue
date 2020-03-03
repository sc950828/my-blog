<template>
    <div>
      component test {{job}}
      <slot name="start"></slot>
      <div v-for="(item, index) of list" :key="index" @click="alert(index)">{{item.name}}</div>
      <slot name="end"></slot>
    </div>
</template>

<script>
  import mixin from '../mixin'

  export default {
    mixins: [mixin],
    name: "ComponentTest",
    props: {
      list: {
        type: Array,
        required: false,
        default: function(){  //对象或数组的默认值必须是函数返回，基本类型可直接写默认值
          return [{name: 'default', age: 24}]
        },
        validator: function(value){
          return value.length >= 2
        }
      }
    },
    methods: {
      alert(index) {
        this.$emit('alertAge', this.list[index].age)
      }
    }
  }
</script>

<style scoped>

</style>
