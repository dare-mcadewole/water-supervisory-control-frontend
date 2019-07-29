<template>
    <div class="wms-404">
        <img src="/404.svg" height="350px" />
        <h3 class="text-error">Sorry, but the page you requested could not be found!</h3>
        <h6 class="text-gray">Try any one of the links in the Navigation bar</h6>
    </div>
</template>

<script>
    export default {
        name: '404'
    }
</script>

<style lang="scss" scoped>
.wms-404 {
    margin: 3em auto;

    img {
        margin: 3em auto;
    }
}
</style>