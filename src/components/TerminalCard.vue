<template>
    <div class="wms-terminal-card bg-primary">
        <h4 class="text-warning">
            Terminal {{ terminal }}
            <i
                class="mdi mdi-checkbox-blank-circle mdi-18px"
                :class="{'text-success': isValveOn, 'text-error': !isValveOn}"></i>
        </h4>
        <div class="wms-pipe">
            <i class="mdi mdi-24px" :class="{ 'mdi-pipe': isValveOn, 'mdi-pipe-disconnected': !isValveOn }"></i>
        </div>
        <z-columns>
            <z-column>
                <h6>Reference Sensor</h6>
                <p>{{ referenceSensor }} LPS</p>
            </z-column>
            <z-column>
                <h6>Remote Sensor</h6>
                <p>{{ remoteSensor }} LPS</p>
            </z-column>
        </z-columns>
        <z-columns>
            <z-column>
                <h6>Online Metering</h6>
                <p v-text="`${onlineMetering.toFixed(2)} Litres`"></p>
            </z-column>
            <z-column>
                <h6>Leakage</h6>
                <p>{{ isThereLeakage ? 'Yes' : 'No' }}</p>
            </z-column>
        </z-columns>
        <z-columns>
            <z-column>
                <h6>Billing</h6>
                <p v-text="`${billing.toFixed(2)} units`"></p>
            </z-column>
            <z-column>
                <h6>Location</h6>
                <p>Ilorin</p>
            </z-column>
        </z-columns>
    </div>
</template>

<script>
    export default {
        name: 'terminal-card',
        props: {
            terminal: {
                type: Number,
                required: true
            },
            referenceSensor: {
                type: Number,
                required: true
            },
            remoteSensor: {
                type: Number,
                required: true
            },
            onlineMetering: {
                type: Number,
                required: true
            },
            valveState: {
                type: Boolean,
                required: true
            },
            billing: {
                type: Number,
                required: true
            }
        },
        mounted () {
            // this.onlineMetering = this.remoteSensor
        },
        data () {
            return {
                flowGap: 3,
                // onlineMetering: 0,
                tester: 0,
                litresConsumed: 0
            }
        },
        computed: {
            isValveOn () {
                return !this.isThereLeakage
                && this.referenceSensor > 0
                && this.billing !== 0
            },
            isThereLeakage () {
                return this.referenceSensor - this.remoteSensor > this.flowGap
            }
        },
        watch: {
            billing (bill) {
                if (bill === 0) {
                    this.$changeValveState({
                        terminal: this.terminal,
                        state: 0
                    }).then(() => {
                        this.$zutre.toast({
                            content: `Terminal ${this.terminal} valve has been put off due to Insufficient funds`,
                            title: 'Terminal Valve State',
                            duration: 3000,
                            type: 'error',
                            position: 'bottom right'
                        })
                    })
                }
            },
            isThereLeakage (leakage) {
                if (leakage) {
                    this.$changeValveState({
                        terminal: this.terminal,
                        state: 0
                    }).then(() => {
                        this.$zutre.toast({
                            content: `Terminal ${this.terminal} valve has been put off due to Leakages`,
                            title: 'Terminal Valve State',
                            duration: 3000,
                            type: 'error',
                            position: 'bottom right'
                        })
                    })
                } else if (!leakage && this.billing !== 0) {
                    this.$changeValveState({
                        terminal: this.terminal,
                        state: 1
                    }).then(() => {
                        this.$zutre.toast({
                            content: `Terminal ${this.terminal} valve is now On`,
                            title: 'Terminal Valve State',
                            duration: 3000,
                            type: 'success',
                            position: 'bottom right'
                        })
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.wms-terminal-card {
    border-radius: 12px;
    padding: 0;
    margin-bottom: .7em;
    position: relative;
    // background-color: #FFF;
}

h4 {
    padding: .5em;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 12px 12px 0 0;
}

h6 {
    font-size: 13px;
    font-weight: 500 !important;
    margin: 0;
    text-align: left;
    opacity: 0.8;
}

p {
    font-size: 20px;
    margin: 0 0 .5em;
    text-align: left;
}

.column {
    margin-left: 1.2em;
}

span.label.label-rounded {
    font-size: 13px !important;
}

.wms-pipe {
    position: absolute;
    left: 15px;
    top: 10px;
}
</style>