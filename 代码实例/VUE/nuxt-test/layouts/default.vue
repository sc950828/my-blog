<template>
  <div>
    <AppHeader></AppHeader>
    <Nuxt />
  </div>
</template>
<script>
import AppHeader from '@/components/AppHeader'

export default {
  components: {AppHeader},
  data() {
    return {}
  }
}
</script>
