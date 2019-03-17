// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
// index.js or main.js
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

var firebase = require('firebase/app')
require('firebase/auth')
Vue.use(Vuetify, {
  iconfont: 'md'
})

Vue.config.productionTip = false
let app
let config = {
  apiKey: 'AIzaSyARb_g4nXT2MrwEhnl4xj2rYRZuxgFbaA8',
  authDomain: 'iqro-marketplace.firebaseapp.com',
  databaseURL: 'https://iqro-marketplace.firebaseio.com',
  projectId: 'iqro-marketplace',
  storageBucket: 'iqro-marketplace.appspot.com',
  messagingSenderId: '854881460637'
}

firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
})
