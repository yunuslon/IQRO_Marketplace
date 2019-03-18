import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Outlet from '@/components/Outlet'
import Customer from '@/components/Customer'
import Product from '@/components/Product'
import Reward from '@/components/Reward'

var firebase = require('firebase/app')
require('firebase/auth')
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/outlet',
      name: 'Outlet',
      component: Outlet,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/customer',
      name: 'Customer',
      component: Customer,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/product',
      name: 'Product',
      component: Product,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/reward',
      name: 'Reward',
      component: Reward,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      redirect: 'login'
    },
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('home')
  else next()
})

export default router
