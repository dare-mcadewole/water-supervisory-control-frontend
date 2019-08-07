<template>
    <div class="wms-demo-page">
        <z-columns>
            <z-column :size="12" :sizeMD="12" :sizeSM="12">
                <section class="wms-source-configuration wms-form bg-primary">
                    <h3 class="text-warning">Source Configuration</h3>
                    <div>
                        <h6>Water Level <i class="mdi mdi-cup-water"></i></h6>
                        <z-input type="number" v-model="waterLevel" />
                    </div>
                    <div>
                        <h6>Pump State <i class="mdi mdi-water-pump"></i></h6>
                        <z-select v-model="pumpState">
                            <option value="1">ON</option>
                            <option value="0">OFF</option>
                        </z-select>
                    </div>
                    <div class="wms-demo-upload-button text-right">
                        <z-button @click="updateTank" size="lg" color="success" :loading="tankStateUpdating">
                            UPDATE TANK
                        </z-button>
                    </div>
                </section>
            </z-column>
            <!-- <z-column :size="8" :sizeMD="12" :sizeSM="12">
                <section class="wms-terminal-configuration wms-form bg-primary">
                    <h3 class="text-warning">Terminal Configuration</h3>
                    <section>
                        <z-columns>
                            <z-column>
                                <h4 class="text-left">Terminal 1</h4>
                                <demo-terminal-card v-model="terminals[0]" @update="updateTerminal(1)">
                                </demo-terminal-card>
                            </z-column>
                            <z-column>
                                <h4 class="text-left">Terminal 2</h4>
                                <demo-terminal-card v-model="terminals[1]" @update="updateTerminal(2)">
                                </demo-terminal-card>
                            </z-column>
                        </z-columns>

                        <z-columns>
                            <z-column>
                                <h4 class="text-left">Terminal 3</h4>
                                <demo-terminal-card v-model="terminals[2]" @update="updateTerminal(3)">
                                </demo-terminal-card>
                            </z-column>
                            <z-column>
                                <h4 class="text-left">Terminal 4</h4>
                                <demo-terminal-card v-model="terminals[3]" @update="updateTerminal(4)">
                                </demo-terminal-card>
                            </z-column>
                        </z-columns>
                    </section>
                </section>
            </z-column> -->
        </z-columns>
    </div>
</template>

<script>
// import DemoTerminalCard from '@/components/DemoTerminalCard'
export default {
    name: 'wms-demo',
    components: {
        // DemoTerminalCard
    },
    mounted () {
        for (var i = 0; i < 4; i++) {
            this.terminals.push({
                reference: 0,
                remote: 0
            })
        }
    },
    data () {
        return {
            tankStateUpdating: false,
            waterLevel: 0,
            pumpState: 1,
            terminals: []
        }
    },
    methods: {
        updateTank () {
            this.tankStateUpdating = true
            Promise.all([
                this.$http({
                    method: 'POST',
                    url: '/tank/level',
                    data: {
                        level: this.waterLevel 
                    }
                }),
                this.$http({
                    method: 'POST',
                    url: '/tank/pump',
                    data: {
                        state: this.pumpState 
                    }
                })
            ]).then((response) => {
                var waterLevel = parseInt(response[0].data.level)
                var pumpState = parseInt(response[1].data.state)
                this.tankStateUpdating = false
                this.$zutre.toast({
                    content: `Water level is ${waterLevel} and Pump is ${pumpState===1 ? 'On' : 'Off'}`,
                    title: 'Main Tank Status',
                    duration: 3000,
                    type: 'success',
                    position: 'bottom right'
                })
            }).catch(() => this.tankStateUpdating = false)
        },

        updateTerminal (tid) {
            var { reference, remote } = this.terminals[tid - 1]
            this.updatingTerminal = true
            Promise.all([
                this.$http({
                    method: 'POST',
                    url: `/terminal/${tid}`,
                    data: {
                        sensor: 1,
                        value: reference
                    }
                }),
                this.$http({
                    method: 'POST',
                    url: `/terminal/${tid}`,
                    data: {
                        sensor: 2,
                        value: remote
                    }
                })
            ]).then(responses => {
                console.log('Responses -> ', responses)
                this.updatingTerminal = false
                this.$zutre.toast({
                    content: `Terminal ${responses[0].data.terminal} sensors have been updated`,
                    title: 'Terminal Update',
                    duration: 3000,
                    type: 'success',
                    position: 'bottom right'
                })
            }).catch(() => this.updatingTerminal = false)
        }
    }
}
</script>

<style lang="scss">
.wms-demo-page {
  padding: 1em 9em;
}

.wms-source-configuration {
    width: 50%;
    margin: auto;
}

.wms-demo-upload-button {
    margin: 1em 0 !important;
    text-align: right !important;
}

.wms-terminal-configuration {
    // border-radius: 12px;
    // padding-bottom: 2em;
    
    h4 {
        width: 80%;
        margin: 0 auto;
        padding: 0;
    }
}
</style>