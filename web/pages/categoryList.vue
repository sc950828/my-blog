<template>
  <div>
    <a-card hoverable style="width: 300px">
      <img
        slot="cover"
        alt="example"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      />
      <a-card-meta title="Europe Street beat">
        <template slot="description"> www.instagram.com </template>
      </a-card-meta>
    </a-card>
  </div>
</template>
<script>
export default {
  async asyncData({ app, params }) {
    const { categorys, total, pageNo, pageSize } = await app.$axios.get(
      `/categorys/web`
    )
    console.log(categorys)
    return {
      categorys,
      total,
      pageNo,
      pageSize,
    }
  },
}
</script>
