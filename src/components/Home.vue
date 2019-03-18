<template>
  <v-app id="inspire">
  <vtoolbar></vtoolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-layout>
      </v-container>
    </v-content>
    <vfooter></vfooter>
  </v-app>
</template>

<script>
import Toolbar from './Toolbar.vue'
import Footer from './Footer.vue'
export default {
  name: 'home',
  components: {
    'vtoolbar': Toolbar,
    'vfooter': Footer
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      drawer: null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
