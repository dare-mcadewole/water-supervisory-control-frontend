<template>
    <div class="wms-overview-card" :style="`background-color: ${colors[color]};`">
        <div>
            <h2 class="text-light">{{ value }}</h2>
            <h6 class="text-light">LPM</h6>
        </div>
        <div>
            <h6 class="text-light">{{ usage }} Usage</h6>
            <z-button size="sm" color="">
                View Report <i class="mdi mdi-file-chart"></i>
            </z-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'usage-card',
        props: {
            usage: {
                type: String,
                required: true
            },
            value: {
                type: Number,
                required: true
            },
            color: {
                type: Number,
                default: 0
            }
        },

        data () {
            return {
                colors: [
                    '#2096f3', '#4caf50', '#f44336', '#fb9700'
                ]
            }
        }
    }
</script>

<style lang="scss">
.wms-overview-card {
    border-radius: 20px;
    padding: 1.5em 2.5em 1.5em 3em;
    margin: .7em 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    opacity: 0.9;

    h2 {
        font-size: 35px;
        font-weight: 600 !important;
        margin: 0;
    }

    h6 {
        font-weight: 500 !important;
        font-size: 13px;
        text-align: right;
    }

    .btn {
        border-radius: 2em;
        border: 0;
        // padding: .5em;
    }

    .btn-sm {
        height: 1.7rem;
        padding: 0.05rem .7rem;
    }
}
</style>