<template>
  <div class="footer-wrap">
    <div class="link">
      <a
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=43068102001051"
        target="_blank"
        ><img
          src="@/assets/images/beian.png"
          width="20"
          height="20"
          alt="beian"
        />湘公网安备 43068102001051号</a
      >
      <a href="https://beian.miit.gov.cn" target="_blank"
        >湘ICP备2021001552号-1</a
      >
    </div>
    <div>© 2021 Randy All Rights Reserved.</div>
  </div>
</template>
<style lang="less" scoped>
.footer-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #8d99a6;
}
.link {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  a {
    padding: 0 5px;
    color: #8d99a6;
    &:hover {
      color: #aeaeae;
    }
  }
}
</style>
