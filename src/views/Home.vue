<template>
  <div class="home">
    <z-columns>
      <z-column
        v-for="(usage, i) in usages"
        :key="i" :size="3" :sizeSM="12" :sizeMD="12">
        <usage-card
          :usage="usage.usage"
          :value="usage.value"
          :color="i"
        />
      </z-column>
    </z-columns>

    <z-columns>
      <z-column :size="3" :sizeSM="12" :sizeMD="12">
        <terminal
          v-for="(terminal, i) in terminals.slice(0,2)"
          :key="i"
          :terminal="terminals.indexOf(terminal)+1"
          :reference-sensor="terminal.referenceSensor"
          :remote-sensor="terminal.remoteSensor"
          :online-metering="terminal.onlineMetering"
          :valve-state="terminal.valveState === 1"
          :billing="terminal.billing"
        />
      </z-column>
      <z-column :size="6" :sizeSM="12" :sizeMD="12">
        <main-tank
          :terminal-states="terminalStates"/>
      </z-column>
      <z-column :size="3" :sizeSM="12" :sizeMD="12">
        <terminal
          v-for="(terminal, i) in terminals.slice(2)"
          :key="i"
          :terminal="terminals.indexOf(terminal)+1"
          :reference-sensor="terminal.referenceSensor"
          :remote-sensor="terminal.remoteSensor"
          :online-metering="terminal.onlineMetering"
          :valve-state="terminal.valveState === 1"
          :billing="terminal.billing"
        />
      </z-column>
    </z-columns>
  </div>
</template>

<script>
import MainTank from '@/components/MainTank'
import Terminal from '@/components/TerminalCard'
export default {
  name: 'home',
  data () {
    return {
      flowGap: 3,
      terminals: [
        {
          referenceSensor: 0,
          remoteSensor: 0,
          onlineMetering: 0,
          valveState: 1,
          billing: 0
        },
        {
          referenceSensor: 0,
          remoteSensor: 0,
          onlineMetering: 0,
          valveState: 1,
          billing: 0
        },
        {
          referenceSensor: 0,
          remoteSensor: 0,
          onlineMetering: 0,
          valveState: 0,
          billing: 0
        },
        {
          referenceSensor: 0,
          remoteSensor: 0,
          onlineMetering: 1,
          valveState: 1,
          billing: 0
        }
      ],
      usages: [
        { usage: 'Daily', value: 73 },
        { usage: 'Weekly', value: 245 },
        { usage: 'Monthly', value: 578 },
        { usage: 'Yearly', value: 1028 },
      ]
    }
  },

  sockets: {
    WMS_TERMINAL_DATA (data) {
      var terminal = this.terminals[data.terminal - 1]
      if (data.sensor === 1) {
        this.terminals[data.terminal - 1].referenceSensor = data.value
        return
      }
      this.terminals[data.terminal - 1].remoteSensor = data.value
    },

    WMS_TERMINAL_STATE (data) {
      this.terminals[data.terminal - 1].valveState = data.state
    },

    WMS_TERMINAL_BILLING (billing) {
      this.terminals[parseInt(billing.terminal) - 1].billing = parseFloat(billing.units)
      console.log('Billing -> ', billing, parseInt(billing.terminal))
    }
  },

  computed: {
    terminalStates () {
      return this.terminals.map(terminal => {
        return terminal.referenceSensor - terminal.remoteSensor <= this.flowGap
      })
    }
  },
  components: {
    MainTank,
    Terminal,
    UsageCard: () => import('@/components/UsageCard.vue')
  }
}
</script>

<style scoped>
.home {
  /* height: 100vh; */
  /* overflow-y: auto;
  overflow-x: hidden; */
  margin: auto;
  width: 90%;
  padding: 0 0 2em;
}

@media screen and (max-width: 1359px) {
  .home {
    width: 90%;
  }
}
</style>
