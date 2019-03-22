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
          <span class="headline">Customer</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 >
                <v-text-field label="Nama" v-model="customerData.nama" required></v-text-field>
              </v-flex>
              <v-flex xs12 >
                <v-text-field label="No. Hp" v-model="customerData.no_hp" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex xs12 >
                <v-text-field label="Alamat" v-model="customerData.alamat" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex xs12 >
                <v-text-field label="Point" v-model="customerData.point" hint="example of helper text only on focus" type="number"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="tambahData">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- +++++++++++++++++++++++++++++edit++++++++++++++++++++++++++++ -->
    <v-dialog v-model="dialogedit" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">Customer</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 >
                <v-text-field label="Nama" v-model="editcustomerData.nama" required></v-text-field>
              </v-flex>
              <v-flex xs12 >
                <v-text-field label="No. Hp" v-model="editcustomerData.no_hp" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex xs12 >
                <v-text-field label="Alamat" v-model="editcustomerData.alamat" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex xs12 >
                <v-text-field label="Point" v-model="editcustomerData.point" hint="example of helper text only on focus" type="number"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialogedit = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="UpdateItem(editcustomerData.id)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  </div>
      <div class="card-body">
        <v-data-table
        :headers="headers"
        :items="customer"
        :search="search"
        class="elevation-1"
        >
<template slot="items" slot-scope="props">
<td>{{ props.item.nama }}</td>
<td class="text-xs-right">{{ props.item.no_hp }}</td>
<td class="text-xs-right">{{ props.item.alamat }}</td>
<td class="text-xs-right">{{ props.item.point }}</td>
<td class="text-xs-right">
<a href="#" @click="editItem(props.item)" data-toggle="tooltip" data-placement="bottom" title="Edit">
<v-icon small class=" mt-2" > edit </v-icon> </a>
<a href="#" @click="hapus(props.item.id)" data-toggle="tooltip" data-placement="bottom" title="Delete">
<v-icon small class="mt-2"> delete </v-icon></a>
</td>
</template>
</v-data-table>
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
        'nama': '',
        'no_hp': '',
        'alamat': '',
        'point': ''
      },
      editcustomerData: {
        'id': '',
        'nama': '',
        'no_hp': '',
        'alamat': '',
        'point': ''
      },
      headers: [
        {
          text: 'Nama',
          align: 'left',
          sortable: true,
          value: 'nama'
        },
        { text: 'No. Hp', value: 'no_hp', align: 'right' },
        { text: 'Alamat', value: 'alamat', align: 'right' },
        { text: 'Point', value: 'point', align: 'right' },
        { text: 'Aksi', value: 'aksi', align: 'right' }
      ],
      dialog: false,
      dialogedit: false,
      customer: []
    }
  },
  created () {
    this.getCustomer()
  },
  computed: {
    sortedCustomer () {
      return this.customer.slice().sort((a, b) => {
        return a.nama - b.nama
      })
    }
  },
  methods: {
    tambahData () {
      db.collection('costumer').add(this.customerData).then(this.getCustomer)
      this.customerData.nama = ''
      this.customerData.no_hp = ''
      this.customerData.alamat = ''
      this.customerData.point = ''
      this.$vs.notify({ title: 'Sukses!!', text: 'Data Berhasil Ditambahkan!!', color: 'primary', icon: 'done_all' })
      this.dialog = false
    },
    hapus (id) {
      if (confirm('Apakah anda yakin untuk menghapus data ini ?')) {
        db.collection('costumer').doc(id).delete().then((data) => {
          this.getCustomer()
          this.dialogDel = false
          this.$vs.notify({title: 'Notif', text: 'Data Terhapus!', color: 'danger', icon: 'warning'})
        })
      }
    },
    editItem (item) {
      this.editId = item.id
      this.editcustomerData.id = item.id
      this.editcustomerData.nama = item.nama
      this.editcustomerData.no_hp = item.no_hp
      this.editcustomerData.alamat = item.alamat
      this.editcustomerData.point = item.point
      this.dialogedit = true
    },
    UpdateItem (id) {
      db.collection('costumer').doc(id).set(this.editcustomerData).then(this.getCustomer, this.dialogedit = false, this.$vs.notify({title: 'Notif', text: 'Data Berhasil Diubah!', color: 'warning', icon: 'warning'}))
      this.editId = ''
      this.editcustomerData.nama = ''
      this.editcustomerData.no_hp = ''
      this.editcustomerData.alamat = ''
      this.editcustomerData.point = ''
    },
    getCustomer () {
      db.collection('costumer').get().then(querySnapshot => {
        const customer = []
        const customerArray = []
        let i = 0
        querySnapshot.forEach((doc) => {
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
