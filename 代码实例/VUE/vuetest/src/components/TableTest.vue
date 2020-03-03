<template>
    <div>
      <el-table :data="tableData" stripe border height="150" @selection-change="handleChange">
        <el-table-column type="selection"  fixed="left"></el-table-column>
        <el-table-column type="index" label="下标" width="200"></el-table-column>
        <el-table-column prop="name" label="名字" sortable></el-table-column>
        <el-table-column prop="address" label="地址" width="1000"></el-table-column>
        <el-table-column prop="date" label="日期" width="1000"></el-table-column>
      </el-table>

      <div>多级表头test</div>
      <el-table border>
        <el-table-column label="配送信息">
          <el-table-column label="姓名"></el-table-column>
          <el-table-column label="地址">
            <el-table-column label="省"></el-table-column>
            <el-table-column label="市"></el-table-column>
            <el-table-column label="区"></el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
      name: "TableTest",
      data () {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      },
      methods: {
        handleChange (val) {
          console.log(val)
        }
      }
    }
</script>

<style scoped>

</style>
