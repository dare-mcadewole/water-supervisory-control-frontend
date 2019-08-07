<template>
  <div id="app">
    <div id="wms-loader" v-if="loadingPage" class="bg-primary">
      <!-- <i class="mdi mdi-water mdi-48px wms-logo"></i> -->
      <h1>Water Supervisory Control</h1>
      <h6 class="version text-gray">
        <i class="mdi mdi-checkbox-blank text-gray"></i>
        Version {{ $store.getters.version }}
        <i class="mdi mdi-checkbox-blank text-gray"></i>
      </h6>
      <loader></loader>
      <h6 class="text-bold">Loading {{ page }} page </h6>
    </div>

    <div v-else>
      <Topbar />
      <z-container>
        <div class="wms-main bg-white">
          <router-view/>
        </div>
      </z-container>
    </div>
  </div>
</template>

<script>
import Topbar from '@/components/Topbar'
import Loader from '@/components/Loader'

export default {
  mounted () {
    setTimeout(() => {
      this.loadingPage = false
    }, 3000)
  },

  data () {
    return {
      loadingPage: true
    }
  },

  computed: {
    page () {
      let page = this.$route.path.replace('/', '')
      return page.length > 0 ? page : 'home'
    }
  },

  sockets: {
    connect () {
      this.$zutre.toast({
        position: 'top right',
        type: 'success',
        title: 'Connection Status',
        content: 'Connected',
        duration: 3000
      })
    },

    disconnect () {
      this.$zutre.toast({
        position: 'top right',
        type: 'error',
        title: 'Connection Status',
        content: 'Disconnected from the server',
        duration: 3000
      })
    },
  }, 

  components: {
    Topbar,
    Loader
  }
}
</script>

<style lang="scss">
::-webkit-scrollbar {
    width: 12px;
}
 
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    border-radius: 10px;
}
 
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #AAA;
    opacity: 0.5;
    margin: 3px;
    -webkit-box-shadow: 0 0 6px rgba(0,0,0,0.5); 
}

#app {
  font-family: 'Google Sans', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

body {
  overflow: auto;
}

#app {
  font-family: 'Google Sans', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 400 !important;
}

#wms-loader {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    margin: 0;
  }

  h6 {
    margin: .1em auto 2em;
    font-size: 15px;
  }

    h6.version {
      // margin: 0;
    }
}

.button, .btn {
  font-size: 13px !important;
  font-weight: 500;
}

div:last-child {
  // width: 90%;
  // margin: auto;
}

.wms-main {
  // height: 100vh;
  width: 100%;
  // padding: 1em 0;
  margin-top: 4em; 
}

.container {
  padding: 0 !important;
}

@keyframes shifter {

}

.wms-form {
    margin: auto;
    border-radius: 12px;
    padding-bottom: 2em;

    h3 {
        background-color: rgba(0, 0, 0, 0.1);
        padding: .8em;
        border-radius: 12px 12px 0 0;
        margin-bottom: 1em;
    }

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

    b {
        margin: 0 5px;
        font-size: 19px;
    }
}
</style>
