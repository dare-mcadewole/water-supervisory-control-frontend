<template>
  <div class="home">
    <z-columns>
      <z-column
        v-for="(usage, i) in usages"
        :key="i" :size="3" :sizeXS="12" :sizeSM="12" :sizeMD="12">
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
    <!-- <button class="wms-refresh" @click="refresh">
      <i class="mdi mdi-refresh mdi-36px"></i>
    </button> -->
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
      // Update this area
      usages: [
        { usage: 'Daily', value: 0 },
        { usage: 'Weekly', value: 0 },
        { usage: 'Monthly', value: 0 },
        { usage: 'Yearly', value: 0 },
      ]
    }
  },

  mounted () {
    this.$socket.emit('WMS_CURRENT_BILLS_REQ')
    this.$socket.emit('WMS_TERMINALS_METERING_REQ')
  },

  sockets: {
    WMS_TERMINAL_DATA (data) {
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
      var { terminal, units } = billing
      this.terminals[parseInt(terminal) - 1].billing += parseFloat(units)
    },

    WMS_CURRENT_BILLS (bills) {
      this.terminals.forEach((terminal, i) => {
        this.terminals[i].billing = bills[i]
      })
    },

    WMS_TERMINALS_METERING (meterings) {
      meterings.forEach((metering, i) => {
        this.terminals[i].onlineMetering = metering
      })
    },

    WMS_TERMINAL_USAGE (usages) {
      var range = 20
      var cake
      this.usages.forEach((usage, i) => {
        cake = (range * (i+1))
        this.usages[i].value = this.mean(usages.slice(0, cake), cake)
      })
      console.log(usages)
    }
  },

  computed: {
    terminalStates () {
      return this.terminals.map(terminal => {
        return terminal.referenceSensor - terminal.remoteSensor <= this.flowGap
      })
    }
  },

  methods: {
    refresh () {
      this.$router.push(this.$route.path)
      console.log(this.$router)
    },

    mean (values, cake) {
      var sum = 0
      values.forEach((val) => {
        sum += val
      })
      return sum/cake
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

.wms-refresh {
  position: absolute;
  right: 1.3em;
  bottom: 1.3em;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5em;
  height: 5em;
  outline: 0;
}

@media screen and (max-width: 1359px) {
  .home {
    width: 90%;
  }
}
</style>
