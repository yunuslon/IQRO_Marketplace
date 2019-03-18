<template>
<v-app id="inspire">
<vtoolbar></vtoolbar>
<v-content>
<b-container class="bv-example-row">
<b-row >
<b-col></b-col>
<b-col cols="12">
<div class="card">
  <div class="card-header">
    <v-layout row justify-left>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Add &nbsp;<v-icon>add</v-icon></v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Outlet</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Nama" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Username" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Password" hint="example of persistent helper text" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="No. Hp" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                 <v-select :items="['Onsite', 'on delevery']" label="Type" required ></v-select>
              </v-flex>
              <v-flex xs12 >
                 <v-textarea name="alamat" label="Alamat" value="" hint="Hint text"></v-textarea>
              </v-flex>
              <v-flex xs12 >
                 <v-textarea name="deskripsi" label="Deskripsi" value="" hint="Hint text"></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  </div>
  <div class="card-body" style="text-align: center;">
<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">No</th>
      <th scope="col">Nama</th>
      <th scope="col">Username</th>
      <th scope="col">Password</th>
      <th scope="col">No. Hp</th>
      <th scope="col">Type</th>
      <th scope="col">Alamat</th>
      <th scope="col">Deskripsi</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(i, index) in isi" :key="index">
      <th scope="row">{{index + 1}}</th>
      <td>{{isi[index].nama}}</td>
      <td>{{isi[index].username}}</td>
      <td>{{isi[index].password}}</td>
      <td>{{isi[index].nohp}}</td>
      <td>{{isi[index].type}}</td>
      <td>{{isi[index].alamat}}</td>
      <td>{{isi[index].deskripsi}}</td>
    </tr>
  </tbody>
</table>
</div>
  </div>
</b-col>
<b-col></b-col>
</b-row>
</b-container>
</v-content>
<vfooter></vfooter>
</v-app>
</template>
<script>
import Toolbar from './Toolbar.vue'
import Footer from './Footer.vue'
// import { db } from '../main'
// const db = firebase.firestore()
export default {
  name: 'outlet',
  components: {
    'vtoolbar': Toolbar,
    'vfooter': Footer
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      drawer: null,
      dialog: false,
      isi: [
        {nama: 'yunus', username: 'jjj', alamat: 'dgsfd', password: 'djald', nohp: '90809823', type: 'alkdsf', deskripsi: 'ldlfaksdfl'}
      ]
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
