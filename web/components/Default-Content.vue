<template>
  <div>
    <div v-if="$nuxt.isOffline">亲 您网络不佳哦~</div>
    <a-row v-else type="flex" justify="center">
      <!-- xs <576px -->
      <!-- sm ≥576px -->
      <!-- md ≥768px -->
      <!-- lg ≥992px -->
      <!-- xl ≥1200px -->
      <!-- xxl ≥1600px -->
      <a-col :xs="24" :sm="24" :lg="24" :xl="21" :xxl="17"> <Nuxt /> </a-col>
    </a-row>
  </div>
</template>
<script>
export default {}
</script>
