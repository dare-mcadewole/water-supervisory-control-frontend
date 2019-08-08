import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    version: '2.1.0',
    terminals: [
      { state: 1 },
      { state: 0 },
      { state: 1 },
      { state: 0 }
    ],
    POST_TERMINAL_ENDPOINT: '',
    PUMP_STATE_ENDPOINT: '',
    TANK_LEVEL_ENDPOINT: '',
    TERMINAL_STATE_ENDPOINT: '',
    BILLING_ENDPOINT: 'http://localhost:5555/api/terminal/billing/'
  },
  getters: {
    version: (state) => state.version
  },
  mutations: {
    CHANGE_VALVE_STATE (state, payload) {
      state.terminals[payload.terminal] = payload.state
    }
  },
  actions: {
  }
})
