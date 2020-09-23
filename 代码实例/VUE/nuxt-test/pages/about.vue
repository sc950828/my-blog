<template>
  <div class="about-wrapper">
    about
    <div>
      <nuxt-child></nuxt-child>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "about"
    }
  },
  head() {
    return {
      title: this.title,
    }
  }
}
</script>
