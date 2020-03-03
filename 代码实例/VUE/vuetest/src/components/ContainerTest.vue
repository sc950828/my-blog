<template>
    <div>
      <el-container>
        <el-header>header</el-header>
        <el-main>main</el-main>
        <el-aside>aside</el-aside>
        <el-footer>footer</el-footer>
      </el-container>

    </div>
</template>

<script>
    export default {
        name: "ContainerTest"
    }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
</style>
