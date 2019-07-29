<template>
    <section class="wms-main-tank" id="tank">
        <h4>
            <i class="mdi mdi-source-commit"></i>
            Source
            <i
                class="mdi"
                :class="{
                    'mdi-check-circle text-success': pState,
                    'text-error mdi-close-circle': !pState
                }">
            </i>
        </h4>
        <div
            class="wms-water-level"
            :class="{ 'blue-water': waterLevel >= 35, 'red-water': waterLevel < 35 }"
            :style="`height: ${level}px`"></div>
        <div class="wms-main-tank-detail">
            <div>
                <h6>Water Level</h6>
                <h3>{{ waterLevel }}%</h3>
            </div>
        </div>
        <div class="wms-terminals">
            <div v-for="(state, i) in terminalStates" :key="i">
                <span>{{ i+1 }}</span>
                <i class="mdi mdi-24px"
                    :class="{'mdi-pipe': state, 'mdi-pipe-disconnected': state}"></i>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'main-tank',
        props: {
            terminalStates: {
                type: Array,
                required: true
            }
        },
        mounted () {
            var tank = document.querySelector('#tank')
            console.log(tank.clientHeight)
            this.tankHeight = tank.clientHeight
        },
        data () {
            return {
                tankHeight: 0,
                waterLevel: 0,
                pumpState: 0,
                level: 0
            }
        },
        sockets: {
            WMS_TANK_WATER_LEVEL (data) {
                this.waterLevel = data.level
            },

            WMS_TANK_PUMP_STATE (data) {
                this.pumpState = parseInt(data.state)
            }
        },
        computed: {
            pState () {
                return this.pumpState === 1
            }
        },
        watch: {
            tankHeight (val) {
                this.level = ((this.waterLevel * val) / 100) - 13
            },

            waterLevel (val) {
                // if (val > 100) this.waterLevel = 100
                this.level = ((this.tankHeight * val) / 100) - 13
            }
        }
    }
</script>

<style lang="scss" scoped>
$water: #80C5DE;
// $water: #5755d9!important;
$low-water: #f44336 !important;
.wms-main-tank {
    background-color: #444;
    background-color: #EAEAEA;
    height: 98%;
    width: 100%;
    border-radius: 12px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

h4 {
    position: absolute;
    left: 0;
    top: 0;
    margin: 15px;
    z-index: 9000;
}

.wms-water-level {
    width: 98.3%;
    // height: var();
    // background-color: $water;
    border-radius: 8px;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    margin: 7px auto;
    transition: all 1.5s ease-out 0.2s;
}

.blue-water {
    background: linear-gradient(to top, #2096f3, $water);
}

.red-water {
    background: linear-gradient(to top, #f44336, #fb9700);
}

.wms-main-tank-detail {
    z-index: 25000;
    background-color: rgba(0, 0, 0, 0.3);
    // padding: 1.2em;
    width: 7.2em;
    height: 7.2em;
    border-radius: 1.5em;
    color: #FFF;
    display: flex;
    align-items: center;
    justify-content: center;

    h6 {
        font-size: 13px;
        font-weight: 500 !important;
    }
}

.wms-terminals {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;

    span {
        margin: 0 20px;
        cursor: pointer;
        color: #EEE;
        font-size: 13px;
        font-weight: 600 !important;
        transition: all 0.25s ease-in-out 0s;

        &:hover {
            transform: scale(1.2);
            opacity: 0.7;
        }
    }

    i {
        color: #FFF;
    }
}
</style>