<template>
  <section class="wms-topbar">
    <div>
      <!-- <i class="mdi mdi-water mdi-36px"></i> -->
      <img src="/icon.png" width="40px" />
      <div align="left">
        <h4 class="text-black">Water Supervisory Control</h4>
        <!-- <h6><i class="mdi mdi-checkbox-blank"></i> Version {{ $store.getters.version }}</h6> -->
      </div>
    </div>
    <div class="wms-topbar-links">
      <router-link to="/" :class="{selected: page === '/'}">
        Home
      </router-link>
      <router-link to="/demo" :class="{selected: page === '/demo'}">
        Demo
      </router-link>
      <router-link to="/billing" :class="{selected: page === '/billing'}">
        Billing
      </router-link>
      <!-- <router-link to="/about" :class="{selected: page === '/about'}">
        About
      </router-link> -->
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    page () {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.wms-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5em;
  height: 4em;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10000;
  box-shadow: 0 3px .3em #DDD;
  background-color: #fff;
  // border-bottom: 2px solid #FAFAFA;

  div:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div {
      margin-left: 1em;
    }
  }

  h4 {
    margin: 0;
    padding: 0;
    color: #666;
  }

  h2 {
    margin: 0;
  }

  h6 {
    font-size: 13px;
    color: #BBB;
    font-weight: 500 !important;
    margin-top: .3em;
  }
}

.wms-topbar-links {
  a {
    font-size: 13.5px;
    margin-left: 3em;
    font-weight: 500;
    outline: 0 !important;
    border: 0;
    color: #AAA;

    &:hover {
      text-decoration: none;
    }

    &.selected {
      color: #5755d9;
      text-decoration: none;
    }
  }
}
</style>
