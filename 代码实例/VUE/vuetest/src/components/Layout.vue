<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="10"><div class="bg-purple-dark">a</div></el-col>
      <el-col :span="2"><div class="bg-purple">b</div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="10" :push="1"><div class="bg-purple-dark">a</div></el-col>
      <el-col :span="3" :pull="1"><div class="bg-purple">b</div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="10" ><div class="bg-purple-dark">a</div></el-col>
      <el-col :span="3" :offset="1"><div class="bg-purple">b</div></el-col>
    </el-row>
    <el-row :gutter="20" type="flex" align="middle" justify="center">
      <el-col :span="10" ><div class="bg-purple-dark">a</div></el-col>
      <el-col :span="3" ><div class="bg-purple">b</div></el-col>
    </el-row>
    <el-row>
      <el-col :xs="1" :sm="5" :md="10" :lg="15" xl="20"><div class="bg-purple-dark">a</div></el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "Layout"
    }
</script>

<style scoped>
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .el-row {
    margin-bottom: 20px;
  }
</style>
