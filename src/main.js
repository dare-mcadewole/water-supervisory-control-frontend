import Vue from 'vue'
import axios from 'axios'
import VueSocketIO from 'vue-socket.io'
import Zutre from 'zutre'
import App from './App.vue'
import router from './router'
import store from './store'

import 'zutre/dist/zutre.css'

Vue.use(Zutre)

// Vue Socket Setup
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'https://watersupervisorycontrol.herokuapp.com/wms?token=hEmG3Zw1frt5ZGuQ609II7KRstubkBG5',
  vuex: {
    store,
    actionPrefix: 'WMS_SOCKET_',
    mutationPrefix: 'WMS_SOCKET_'
  }
}))

// Axios Setup
Vue.prototype.$http = axios.create({
  baseURL: 'https://watersupervisorycontrol.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
