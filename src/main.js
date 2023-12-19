import Vue from 'vue'

import App from './App.vue'
import router from './router'
import Vuex from 'vuex'

import './assets/main.css'
import store from './store'

Vue.use(Vuex)

new Vue({
  router,
  render: (h) => h(App),
  store
}).$mount('#app')
