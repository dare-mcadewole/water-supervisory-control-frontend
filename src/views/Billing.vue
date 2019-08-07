<template>
    <div class="wms-billing-page">
        <div class="wms-billing-form wms-form bg-primary">
            <h3 class="text-warning">Billing Form</h3>
            <z-chip class="bg-warning text-dark">
                Sold at <b>{{ naira }}{{ cost }}</b> per unit
            </z-chip>
            <div>
                <h6>Terminal</h6>
                <z-input type="number" v-model="terminal" min="1" max="4" />
            </div>
            <div>
                <h6>Price (in {{ naira }})</h6>
                <z-input type="number" v-model="price" size="lg" />
            </div>
            <div>
                <h6>Units</h6>
                <h4>{{ units.toFixed(2) }}</h4>
            </div>
            <div>
                <z-button @click="pay" size="lg" color="success" :loading="updatingBill">
                    PAY
                </z-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'billing-page',
        data () {
            return {
                updatingBill: false,
                terminal: 1,
                price: 0.0,
                units: 0.0,
                cost: 1.14
            }
        },
        computed: {
            naira: () => '\u20a6'
        },
        watch: {
            price (val) {
                this.units = val / this.cost
            }
        },
        methods: {
            pay () {
                this.updatingBill = true
                this.$http({
                    method: 'POST',
                    url: `terminal/billing/${this.terminal}`,
                    data: {
                        units: this.units
                    }
                }).then(({ data }) => {
                    this.updatingBill = false
                    this.$zutre.toast({
                        content: `Billing for Terminal ${data.terminal} has been updated`,
                        title: 'Terminal Bill',
                        duration: 3000,
                        type: 'success',
                        position: 'bottom right'
                    })
                }).catch(err => this.updatingBill = false)
            }
        }
    }
</script>

<style lang="scss">
.wms-billing-page {
    width: 100%;
    // height: 80vh;
    overflow: hidden;
    padding-top: 2em;
    // display: flex;
    // align-items: center;
    // justify-content: center;
}

.wms-billing-form {
    width: 40%;

    > div {
        &:last-child {
            text-align: right;
        }
    }
}

</style>