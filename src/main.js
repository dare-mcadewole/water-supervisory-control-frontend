import Vue from 'vue'
import axios from 'axios'
import VueSocketIO from 'vue-socket.io'
import Zutre from 'zutre'
import App from './App.vue'
import router from './router'
import store from './store'

import 'zutre/dist/zutre.css'

Vue.use(Zutre)

const CLOUD_SERVER = 'https://watersupervisorycontrol.herokuapp.com';
// const LOCAL_SERVER = 'http://localhost:5555';

// Vue Socket Setup
Vue.use(new VueSocketIO({
  debug: false,
  connection: `${CLOUD_SERVER}/wms?token=hEmG3Zw1frt5ZGuQ609II7KRstubkBG5`,
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
