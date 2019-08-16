import Vue from 'vue'
import axios from 'axios'
import VueSocketIO from 'vue-socket.io'
import IO from 'socket.io-client'
import Zutre from 'zutre'
import App from './App.vue'
import router from './router'
import store from './store'

import 'zutre/dist/zutre.css'

Vue.use(Zutre)

const CLOUD_SERVER = 'https://watersupervisorycontrol.herokuapp.com';
const CLOUD_SOCKET_SERVER = 'wss://watersupervisorycontrol.herokuapp.com';
// const LOCAL_SERVER = 'http://192.168.1.108:5555';
// const LOCAL_SOCKET_SERVER = 'ws://192.168.1.108:5555';
// const SERVER = LOCAL_SERVER;

// Vue Socket Setup
const socket = IO(`${CLOUD_SOCKET_SERVER}/wms`, {
  transports: [ 'websocket' ],
  timeout: 5000,
  reconnectionAttempts: 'Infinity'
})
Vue.use(new VueSocketIO({
  debug: true,
  // connection: `${SERVER}/wms?token=hEmG3Zw1frt5ZGuQ609II7KRstubkBG5`,
  connection: socket,
  vuex: {
    store,
    actionPrefix: 'WMS_SOCKET_',
    mutationPrefix: 'WMS_SOCKET_'
  }
}))

// Axios Setup
var axiosInstance = axios.create({
  baseURL: `${CLOUD_SERVER}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});
Vue.prototype.$http = axiosInstance

Vue.prototype.$changeValveState = ({ terminal, state }) => {
  return new Promise((resolve, reject) => {
    axiosInstance({
      url: `/terminal/state/${terminal}`,
      method: 'POST',
      data: {
        state
      }
    }).then(resolve).catch(reject)
  })
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
