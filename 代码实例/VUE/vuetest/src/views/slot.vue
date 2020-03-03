<template>
  <div>
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
    <div>
      {{name}}
    </div>
    <button @click="changeName">changeName</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: 'randy',
      age: 24
    }
  },
  methods: {
    changeName() {
      this.name = 'demi'
    }
  }
}
</script>
