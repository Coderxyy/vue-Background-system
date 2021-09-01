import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/base.css'

////////////////////////////////////////////////////////////////////////
import axios from "axios"; //导入axios模块
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/' //配置请求根路径
//拦截器（这个你可以先不了解，普通发的请求用不到这个）
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios //这个你可以认为把axios换一个名字，叫$http，方便使用
////////////////////////////////////////////////////////////////////////

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
