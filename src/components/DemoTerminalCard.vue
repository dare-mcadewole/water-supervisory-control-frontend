<template>
    <div class="wms-demo-terminal-card">
        <div>
            <h6>Reference Sensor (in LPM)</h6>
            <z-input type="number" v-model="reference" />
        </div>
        <div>
            <h6>Remote Sensor (in LPM)</h6>
            <z-input type="number" v-model="remote" />
        </div>
        <div class="wms-demo-upload-button text-right">
            <z-button size="sm" @click="$emit('update')">
                Update Terminal
                <i class="mdi mdi-upload"></i>
            </z-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'demo-terminal-card',
        props: [ 'value' ],
        data () {
            return {
                reference: 0,
                remote: 0
            }
        },
        watch: {
            reference (reference) {
                this.$emit('input', {
                    reference,
                    remote: this.remote
                })
            },
            remote (remote) {
                this.$emit('input', {
                    reference: this.reference,
                    remote
                })
            }
        }
    }
</script>

<style lang="scss">
.wms-demo-terminal-card {
    margin-bottom: 2em;

    > div {
        width: 80%;
        margin: auto;
        text-align: left;

        input.form-input, select.form-select {
            background-color: rgba(0, 0, 0, 0.2) !important;
            color: #FFF;
            border: 0;
            font-size: 19px;
        }

        h6 {
            margin: 1.5em 0 5px;
            font-weight: 500 !important;
            font-size:13px;
        }
    }
}

.wms-demo-upload-button {
    width: 90%;
    margin: .3em auto 0;
}
</style>