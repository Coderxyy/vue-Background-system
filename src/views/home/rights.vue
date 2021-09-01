<template>
<div>
<!--  //面包屑导航-->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
  </el-breadcrumb>
<!--  //卡片试图-->
  <el-card>
    <el-table :data="rightlist" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="权限名称" prop="authName"></el-table-column>
      <el-table-column label="路径" prop="path"></el-table-column>
      <el-table-column label="权限等级" prop="level">
        <template>
          <el-tag type="danger" v-if="scope.row.level === 0">一级权限</el-tag>
          <el-tag type="warning" v-else-if="scope.row.level === 1">二级权限</el-tag>
          <el-tag type="success" v-else-if="scope.row.level === 2">三级权限</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</div>
</template>

<script>
export default {
  name: "rights",
  data() {
    return {
      rightlist: []
    }
  },
  created() {
    this.getrightlist()
  },
  methods: {
    getrightlist() {
      this.$http.get('rights/list').then(res => {
        if(res.status == 200){
          this.rightlist = res.data.data
          console.log(this.rightlist);
        }else {
          this.$message.error('获取信息失败，请稍后再试')
        }

      })
    }
  }
}
</script>

<style scoped>

</style>