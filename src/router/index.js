import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Home from "@/views/Home";
import welcome from "@/views/welcome";
import users from "@/views/home/users";
import roles from "@/views/home/roles";
import rights from "@/views/home/rights";
import goods from "@/views/home/goods";
import params from "@/views/home/params";
import categories from "@/views/home/categories";
import orders from "@/views/home/orders";
import reports from "@/views/home/reports";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: Login
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: welcome
      },
      {
        path: '/users',
        component: users,
      },
      {
        path: '/roles',
        component: roles
      },
      {
        path: '/rights',
        component: rights
      },
      {
        path: '/goods',
        component: goods
      },
      {
        path: '/params',
        component: params
      },
      {
        path: '/categories',
        component: categories
      },
      {
        path: '/orders',
        component: orders
      },
      {
        path: '/reports',
        component: reports
      }
    ]
  }

]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {

  if(to.path === '/Login'){
    return next()
  }
  const token = window.sessionStorage.getItem('token')
  if(!token){
    return next('/Login')
  }
  else {
    next()

  }

})

export default router
