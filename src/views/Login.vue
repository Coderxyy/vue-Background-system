<template>
<div class="login">
  <div class="login-box">
    <div class="content">

      <el-form  ref="login" :rules="rules" label-width="80px" :model="formLabelAlign">

        <el-form-item label="用户名" prop="user">
          <el-input v-model="formLabelAlign.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="formLabelAlign.password" prefix-icon="el-icon-star-off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>

      </el-form>
    </div>

  </div>
</div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      //定义变量保存数据
      formLabelAlign: {
        username: 'admin',
        password: '123456',
      },
      rules: {
        user: [{required: true, message: '请输入活动名称', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
      },

    }
  },
  methods: {
    resetForm() {
      this.username = ''
      this.password = ''
    },
    login() {
      this.$http.post('login', this.formLabelAlign).then( res => {
        const data = res.data
        console.log(data.meta.status);
        console.log(res);
        if(data.meta.status != 200){
          this.$message.error('登录出现错误哦，请检查用户名和密码');

        }
        else {
          this.$message.success('登录成功');
          window.sessionStorage.setItem('token', res.data.data.token)
          console.log(res.data.data.token);
          this.$router.push('/Home')

        }
      })
    }
  }
}
</script>

<style scoped>

.login{
  background-color: #2b4b6b;
  height: 100vh;
  position: relative;
}
.login-box{
  width: 400px;
  height: 350px;
  background-color: white;
  border-radius: 5px;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.content{
  position: absolute;
  top: 30%;
  left: 10%;
}
</style>