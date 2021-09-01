<template>
  <el-container class="container">

    <el-header>
      <div class="left">
        <img src="" alt="">
        <span>后台管理系统</span>
      </div>
      <div class="right">
        <el-button type="danger" @click="out">退出</el-button>
      </div>

    </el-header>

    <el-container>
      <el-aside :width="isshow ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleclick">|||</div>
          <el-menu
              unique-opened
              background-color="#333744"
              text-color="#fff"
              active-text-color="#409EFF"
              :collapse="isshow"
              :collapse-transition="false"
              :router="true"
          >
            <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
              <template slot="title">
                <i :class="iconlist[item.id]"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item :index="'/' + children.path" v-for="children in item.children" :key="children.id">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{children.authName}}</span>
                </template>
              </el-menu-item>

            </el-submenu>

          </el-menu>
      </el-aside>
      <el-main>

        <router-view></router-view>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      isshow: false,
      menulist: [],
      iconlist: {
        '125': 'el-icon-s-custom',
        '103': 'el-icon-s-check',
        '101': 'el-icon-s-shop',
        '102': 'el-icon-s-order',
        '145': 'el-icon-s-data',
      }

    }
  },
  created() {
    this.getMenulist()
  },
  methods: {
    out() {
      window.sessionStorage.clear()
      this.$router.push('/Login')
    },
    getMenulist() {    //发送网络请求，类型get，url是menus， 这个请求不需要传参数
      this.$http.get('menus').then(res =>{ //then方法，网络请求发送成功，then方法接受并处理返回的数据， res代表result这个字符写什么都可以，主要是代表返回的数据
                                               //拿到数据后，自己可以先行打印出来看看数据

        this.menulist = res.data.data  //将返回的数据赋值给我们data里的变量，方便使用，注意要加this

      })
    },
    toggleclick() {
      this.isshow = !this.isshow

    }
  }
}
</script>

<style scoped>
.container{
  height: 100vh;
}
.el-header{
  background-color: #373D41;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left{
  color: white;
  font-size: 1.5rem;
}
.el-menu{
  border-right: none;
}
.toggle-button{
  background-color: #4A5064;
  color: white;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.el-aside{
  background-color: #333744;
}
.el-main{
  background-color: #EAEDF1;
}
</style>