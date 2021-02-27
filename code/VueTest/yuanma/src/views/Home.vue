<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>{{msg}}</div>
  </div>
</template>

<script>

export default {
  name: "Home",
  data() {
    return {
      msg: "randy"

    }
  },
  mounted() {
    console.log(this.msg)
    console.log(this._data.msg)
    this.msg = 'demi'
    console.log(this.msg)
    console.log(this._data.msg)
  }
};
</script>
