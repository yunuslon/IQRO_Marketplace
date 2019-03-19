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
    <!-- <button @click="ubah(row.item)">h</button> -->
    <!-- <p>{{kos}}</p> -->
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
            <v-layout wrap >
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="outletData.nama" label="Nama" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="outletData.username"  label="Username" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="outletData.password" label="Password" hint="example of persistent helper text" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="outletData.no_hp"  label="No. Hp" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                 <v-select :items="['Onsite', 'on delevery']" label="Type" required v-model="outletData.type"  ></v-select>
              </v-flex>
              <v-flex xs12 >
                 <v-textarea name="alamat" label="Alamat" v-model="outletData.alamat"  hint="Hint text"></v-textarea>
              </v-flex>
              <v-flex xs12 >
                 <v-textarea name="deskripsi" label="Deskripsi" v-model="outletData.deskripsi"  hint="Hint text"></v-textarea>
              </v-flex>
            </v-layout>
            <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="onSubmit">Save</v-btn>
        </v-card-actions>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
  </div>
  <div class="card-body" style="text-align: center;">
  <div class="table-responsive">
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
      <th scope="col">Aksi</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(i, index) in kos" :key="index">
      <th scope="row">{{index + 1}}</th>
      <td>{{i.nama}}</td>
      <td>{{i.username}}</td>
      <td>{{i.password}}</td>
      <td>{{i.no_hp}}</td>
      <td>{{i.type}}</td>
      <td>{{i.alamat}}</td>
      <td>{{i.deskripsi}}</td>
      <td>
      <v-layout row justify-center>
      <v-dialog v-model="dialogDel" persistent max-width="290">
        <template v-slot:activator="{ on }">
          <a href="#" dark v-on="on" data-toggle="tooltip" data-placement="bottom" title="Delete">
           <v-icon>delete</v-icon> 
          </a>
        </template>
        <v-card>
          <v-card-title class="headline">Apakah anda yakin igin menghapus data outlet {{i.nama}} ?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="dialogDel = false">Tidak</v-btn>
            <v-btn color="green darken-1" flat @click="hapus(i.id)">Ya</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
          <a href="#" v-on:click="onEdit(product)" data-toggle="tooltip" data-placement="bottom" title="Edit">
           <v-icon>create</v-icon></a>
      </td>
    </tr>
  </tbody>
</table>
</div>
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
import { db } from '../main'
export default {
  name: 'outlet',
  components: {
    'vtoolbar': Toolbar,
    'vfooter': Footer
  },
  data () {
    return {
      outletData: {
        'nama': '',
        'username': '',
        'password': '',
        'no_hp': '',
        'type': '',
        'alamat': '',
        'deskripsi': ''
      },
      msg: 'Welcome to Your Vue.js App',
      drawer: null,
      dialog: false,
      dialogDel: false,
      kos: [],
      result: []
    }
  },
  methods: {
    onSubmit(){
      db.collection('outlet').add(this.outletData).then(this.readData)
      this.outletData.nama = ''
      this.outletData.username = ''
      this.outletData.password = ''
      this.outletData.no_hp = ''
      this.outletData.type = ''
      this.outletData.alamat = ''
      this.outletData.deskripsi = ''
      alert('Data Berhasil Ditambahkan!')
      this.dialog = false
      // this.readData()
    },
    readData(){
      db.collection('outlet').get().then(querySnapshot =>{
        const kos = []
        const kosArray = []
        let i = 0
        querySnapshot.forEach((doc)=>{
          kosArray.push(doc.data())
          kosArray[i].id = doc.id
          kos.push(kosArray[i])
          i++
        })

        this.kos = kos
      })
    },
    // ubah() {
    //   this.dialog = true
    //   this.outletData.nama = ''
    //   this.outletData.username = ''
    //   this.outletData.password = ''
    //   this.outletData.no_hp = ''
    //   this.outletData.type = ''
    //   this.outletData.alamat = ''
    //   this.outletData.deskripsi = ''
    // },
    hapus(id){
      db.collection('outlet').doc(id).delete().then((data)=> {
          this.readData()
          this.dialogDel = false
          function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      // let color = `rgb(${getRandomInt(0,255)},${getRandomInt(0,255)},${getRandomInt(0,255)})`
        this.$vs.notify({title:'Notif',text:'Data Terhapus!',color:'dark',position:'top-center'})
          // alert('Data Terhapus!')
      })
    }
  },
  mounted () {
    this.readData()
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
