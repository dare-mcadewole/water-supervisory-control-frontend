import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    POST_TERMINAL_ENDPOINT: '',
    PUMP_STATE_ENDPOINT: '',
    TANK_LEVEL_ENDPOINT: '',
    TERMINAL_STATE_ENDPOINT: '',
    BILLING_ENDPOINT: 'http://localhost:5555/api/terminal/billing/'
  },
  mutations: {

  },
  actions: {

  }
})
