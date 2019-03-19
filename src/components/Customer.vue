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
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
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
    
      <div class="card-body">
        <div class="table table-striped">
          <table class="table" >
            <thead>
              <tr>
                <th scope="col">
                  Nama
                </th>
                <th>
                  No. Hp
                </th>
                <th>
                  Alamat
                </th>
                <th>
                  Point
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="customer in sortedCustomer" v-bind:key="customer.id" >
                <template >
                  <td>
                    {{customer.nama}}
                  </td>
                  <td>
                    {{customer.no_hp}}
                  </td>
                  <td>
                    {{customer.alamat}}
                  </td>
                  <td>
                    {{customer.point}}
                  </td>
                </template>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    <!-- </div> -->
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
  name: 'Customer',
  components: {
   'vtoolbar': Toolbar,
   'vfooter': Footer
  },

  data () {
    return {
      search: '',
      editId: '',
      customerData: {
        'id' : '',
        'nama': '',
        'no_hp': '',
        'alamat': '',
        'point': ''
      },
      editCustomerData: {
        'id' : '',
        'nama': '',
        'no_hp': '',
        'alamat': '',
        'point': ''
      },
      customer: []
    }
  },
  created() {
    this.getCustomer()
  },
  computed:{
    sortedCustomer(){
      return this.customer.slice().sort((a,b)=>{
        return a.nama - b.nama
      })
    }
  },
  methods: {
    getCustomer() {
      db.collection('costumer').get().then(querySnapshot =>{
        const customer = []
        const customerArray = []
        let i = 0
        querySnapshot.forEach((doc)=>{
          customerArray.push(doc.data())
          customerArray[i].id = doc.id
          customer.push(customerArray[i])
          i++
        })

        this.customer = customer
      })
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
