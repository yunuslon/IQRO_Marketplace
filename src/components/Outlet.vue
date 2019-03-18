<template>
<v-app id="inspire">
<vtoolbar></vtoolbar>
<v-content>
    <!-- <v-container fluid fill-height>
    <v-layout justify-center align-center> -->
<v-form v-model="valid">
<v-container>
    <v-layout>
    <v-flex xs12 md4 >
        <v-text-field
        v-model="firstname"
        :rules="nameRules"
        :counter="10"
        label="First name"
        required
        ></v-text-field>
    </v-flex>
    <v-flex xs12 md4 >
        <v-text-field
        v-model="lastname"
        :rules="nameRules"
        :counter="10"
        label="Last name"
        required
        ></v-text-field>
    </v-flex>
    <v-flex xs12 md4>
        <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
        ></v-text-field>
    </v-flex>
    </v-layout>
</v-container>
</v-form>
    <!-- </v-layout>
    </v-container> -->
</v-content>
<vfooter></vfooter>
</v-app>
</template>

<script>
import Toolbar from './Toolbar.vue'
import Footer from './Footer.vue'
export default {
  name: 'outlet',
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
