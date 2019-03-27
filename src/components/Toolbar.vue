<template>
<div>
  <v-toolbar color="light-blue darken-1" dark fixed-top app clipped-left>
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title>IQRO</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat @click="logout">
      <v-icon>logout</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
  <!-- navigation -->
  <!-- <v-navigation-drawer v-model="drawer" clipped app hide-overlay dark> -->
    <!-- <div id="app">
  <v-app id="inspire"> -->
<v-navigation-drawer
v-model="drawer"
  :mini-variant.sync="mini"
  hide-overlay
  clipped app dark
  stateless>
<v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="../assets/admin.png">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Admin</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn
              icon
              @click.stop="mini = !mini"
            >
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>
<v-list dense>
    <v-divider></v-divider>
<router-link to="/outlet" style="color:white;text-decoration:none;">
<v-list-tile class="hov">
<v-list-tile-action>
<v-icon>store</v-icon>
</v-list-tile-action>
<v-list-tile-content>
<v-list-tile-title>Outlet</v-list-tile-title>
</v-list-tile-content>
</v-list-tile>
</router-link>
<router-link to="/customer" style="color:white;text-decoration:none;">
<v-list-tile class="hov">
<v-list-tile-action>
<v-icon>people_outline</v-icon>
</v-list-tile-action>
<v-list-tile-content>
<v-list-tile-title>Customer</v-list-tile-title>
</v-list-tile-content>
</v-list-tile>
</router-link>
<router-link to="/product" style="color:white;text-decoration:none;">
<v-list-tile class="hov">
<v-list-tile-action>
<v-icon>card_travel</v-icon>
</v-list-tile-action>
<v-list-tile-content>
<v-list-tile-title>Product</v-list-tile-title>
</v-list-tile-content>
</v-list-tile>
</router-link>
<router-link to="/reward" style="color:white;text-decoration:none;">
<v-list-tile class="hov">
<v-list-tile-action>
<v-icon>redeem</v-icon>
</v-list-tile-action>
<v-list-tile-content>
<v-list-tile-title>Reward</v-list-tile-title>
</v-list-tile-content>
</v-list-tile>
</router-link>
</v-list>
</v-navigation-drawer>
</div>
</template>
<script>
var firebase = require('firebase/app')
require('firebase/auth')
export default {
  data () {
    return {
      drawer: true,
      mini: null,
      right: null
    }
  },
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>
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
.hov:hover{
  background-color: #616161;
}
</style>
