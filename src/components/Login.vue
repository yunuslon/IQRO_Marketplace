<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" v-model="username" label="Login" type="text"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" v-model="pass" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" v-on:click="signIn">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import router from '../router'
var firebase = require('firebase/app')
require('firebase/auth')
export default {
  name: 'login',
  data: () => ({
    drawer: null,
    username: '',
    pass: ''
  }),
  props: {
    source: String
  },
  methods: {
    signIn: function () {
      firebase.auth().signInWithEmailAndPassword(this.username, this.pass).then(
        function (user) {
          router.replace('home')
        },
        function (err) {
          alert('Maaf, ' + err.message)
        }
      )
    }
  }
}
</script>
