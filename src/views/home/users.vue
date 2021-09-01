<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>

  <el-card class="box-card" >
    <el-row :gutter="25">
      <el-col :span="7">
        <el-input placeholder="请输入内容"
                  class="input-with-select"
                  v-model="queryInfo.query"
                  clearable
        >
        <el-button slot="append" icon="el-icon-search" @click="getuserlist"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addClick">添加用户</el-button>

      </el-col>

    </el-row>
    <el-table :data="userlist" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="姓名" prop="username"> </el-table-column>
      <el-table-column label="邮箱" prop="email"> </el-table-column>
      <el-table-column label="电话" prop="mobile"> </el-table-column>
      <el-table-column label="角色" prop="role_name"> </el-table-column>
      <el-table-column label="状态" prop="mg_state">
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="statechange(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editClick(scope.row.id)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteClick(scope.row.id)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分配角色" placement="bottom" :enterable="false">
            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userlist.length">
    </el-pagination>
  </el-card>

<!--  添加用户信息-->
  <el-dialog
      title="添加用户"
      :visible.sync="adddialogVisible"
      width="50%"
      @close="addclosed"
      >
    <el-form :model="addForm" :rules="addFormrules" ref="addForm" label-width="70px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="addForm.password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="addForm.mobile"></el-input>
      </el-form-item>
      </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="adddialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="adduser">确 定</el-button>
  </span>
  </el-dialog>

<!--修改用户信息-->
  <el-dialog
      title="修改用户信息"
      :visible.sync="edituserVisible"
      width="40%"
  >
    <el-form :model="editForm" :rules="editFormrules" ref="ruleForm" label-width="100px" class="demo-ruleForm" @close="editclosed">
      <el-form-item label="用户名" prop="name">
        <el-input disabled v-model="edituser.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="name">
        <el-input v-model="edituser.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="name">
        <el-input v-model="edituser.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="edituserVisible = false">取 消</el-button>
    <el-button type="primary" @click="edituserclick">确 定</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      userlist: [],
      total: '0',
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2,
      },
      adddialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      addFormrules: {
        username: [
            {
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
          }
        ]
      },
      edituserVisible: false,
      editForm: {},
      editFormrules: {},
      edituser: {},
    }
  },
  created() {
    this.getuserlist()
  },
  methods: {
    getuserlist() {
      this.$http.get('users', {
        params: this.queryInfo
      }).then(res => {
        this.userlist = res.data.data.users
        console.log(res);
        console.log(this.userlist);
        this.total = res.data.total

      })
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getuserlist()

    },
    //监听页码值变化
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getuserlist()

    },
    statechange(userinfo) {
      this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.$message.success('状态更新成功')
        } else {
          this.$message.error('状态更新失败');
          userinfo.mg_state = !userinfo.mg_state
        }
      })
    },
    addClick() {
      this.adddialogVisible = true
    },
    //关闭重置
    addclosed() {
      this.$refs.addForm.resetFields()
    },
    adduser() {
      this.$refs.addForm.validate(valid => {
        if(valid == true){
          this.$http.post('users', this.addForm).then(res => {
            console.log(res);
            if(res.data.meta.status == 201){
              this.$message.success('创建成功')
              this.adddialogVisible = false
            }
            else {
              this.$message.error('创建失败')
            }
          })
        }
        else {
          this.$message.error('校验未通过，请检查所填信息是否合法')

        }
      })
    },
    editClick(id) {
      this.edituserVisible = true
      this.$http.get('users/' + id).then(res => {
        console.log(res);
        if(res.data.meta.status == 200){
          this.$message.success('查询成功')
          this.edituser = res.data.data
          console.log(this.edituser);
        }
      })

    },
    editclosed() {
      this.$refs.ruleForm.resetFields()
    },
    edituserclick() {
      this.$http.put('users/' + this.edituser.id, {
        email: this.edituser.email,
        mobile: this.edituser.mobile
      }).then(res => {
        if(res.status == 200){
          this.$message.success('修改成功')
          this.getuserlist()
          this.edituserVisible = false
        }else {
          this.$message.error('修改失败，请重试')
        }
      })
    },
    //删除
    deleteClick(id) {
      console.log(id);
      //询问是否删除
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$http.delete('users/' + id).then(res => {
          if(res.status == 200){
            this.$message.success('删除成功')
            this.getuserlist()
          }else {
            this.$message.error('删除失败，请重试')
          }
        })

      }).catch(() => {
        this.$message.error('已取消删除')
      });
    }
  }

}
</script>

<style scoped>
.el-table{
  margin-top: 15px;
}
</style>