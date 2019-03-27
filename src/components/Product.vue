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
          <span class="headline">Product</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Nama Paket" v-model="productData.nama_paket" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Jenis" v-model="productData.jenis" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Harga Pokok" v-model="productData.harga_pokok" type="number" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Harga Beli" v-model="productData.harga_beli" type="number" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Harga Jual" v-model="productData.harga_jual" type="number" required></v-text-field>
              </v-flex>
              <v-flex xs12 >
                <v-text-field label="Point" v-model="productData.point" required type="number"></v-text-field>
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
          <span class="headline">Product</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Nama Paket" v-model="editproductData.nama_paket" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Jenis" v-model="editproductData.jenis" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Harga Pokok" v-model="editproductData.harga_pokok" type="number" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Harga Beli" v-model="editproductData.harga_beli" type="number" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Harga Jual" v-model="editproductData.harga_jual"  type="number" required></v-text-field>
              </v-flex>
              <v-flex xs12 >
                <v-text-field label="Point" v-model="editproductData.point" required type="number"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialogedit = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="UpdateItem(editproductData.id)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  </div>
      <div class="card-body">
        <v-data-table
        :headers="headers"
        :items="product"
        :search="search"
        class="elevation-1"
        >
<template slot="items" slot-scope="props">
<td>{{ props.item.nama_paket }}</td>
<td class="text-xs-right">{{ props.item.jenis }}</td>
<td class="text-xs-right">Rp. {{ props.item.harga_pokok }}</td>
<td class="text-xs-right">Rp. {{ props.item.harga_beli }}</td>
<td class="text-xs-right">Rp. {{ props.item.harga_jual }}</td>
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
  name: 'Product',
  components: {
    'vtoolbar': Toolbar,
    'vfooter': Footer
  },

  data () {
    return {
      search: '',
      editId: '',
      productData: {
        'nama_paket': '',
        'jenis': '',
        'harga_pokok': '',
        'harga_beli': '',
        'harga_jual': '',
        'point': ''
      },
      editproductData: {
        'id': '',
        'nama_paket': '',
        'jenis': '',
        'harga_pokok': '',
        'harga_beli': '',
        'harga_jual': '',
        'point': ''
      },
      headers: [
        {
          text: 'Nama Paket',
          align: 'left',
          sortable: true,
          value: 'nama'
        },
        { text: 'Jenis', value: 'jenis', align: 'right' },
        { text: 'Harga Pokok', value: 'harga_pokok', align: 'right' },
        { text: 'Harga Beli', value: 'harga_beli', align: 'right' },
        { text: 'Harga Jual', value: 'harga_jual', align: 'right' },
        { text: 'Point', value: 'point', align: 'right' },
        { text: 'Aksi', value: 'aksi', align: 'right' }
      ],
      dialog: false,
      dialogedit: false,
      product: []
    }
  },
  created () {
    this.getProduct()
  },
  methods: {
    tambahData () {
      db.collection('product').add(this.productData).then(this.getProduct)
      this.productData.nama_paket = ''
      this.productData.jenis = ''
      this.productData.harga_pokok = ''
      this.productData.harga_beli = ''
      this.productData.harga_jual = ''
      this.productData.point = ''
      this.$vs.notify({ title: 'Sukses!!', text: 'Data Berhasil Ditambahkan!!', color: 'primary', icon: 'done_all' })
      this.dialog = false
    },
    hapus (id) {
      if (confirm('Apakah anda yakin untuk menghapus data ini ?')) {
        db.collection('product').doc(id).delete().then((data) => {
          this.getProduct()
          this.dialogDel = false
          this.$vs.notify({title: 'Notif', text: 'Data Terhapus!', color: 'danger', icon: 'warning'})
        })
      }
    },
    editItem (item) {
      this.editId = item.id
      this.editproductData.id = item.id
      this.editproductData.nama_paket = item.nama_paket
      this.editproductData.jenis = item.jenis
      this.editproductData.harga_pokok = item.harga_pokok
      this.editproductData.harga_beli = item.harga_beli
      this.editproductData.harga_jual = item.harga_jual
      this.editproductData.point = item.point
      this.dialogedit = true
    },
    UpdateItem (id) {
      db.collection('product').doc(id).set(this.editproductData).then(this.getProduct, this.dialogedit = false, this.$vs.notify({title: 'Notif', text: 'Data Berhasil Diubah!', color: 'warning', icon: 'warning'}))
      this.editId = ''
      this.editproductData.nama_paket = ''
      this.editproductData.jenis = ''
      this.editproductData.harga_pokok = ''
      this.editproductData.harga_beli = ''
      this.editproductData.harga_jual = ''
      this.editproductData.point = ''
    },
    getProduct () {
      db.collection('product').get().then(querySnapshot => {
        const product = []
        const productArray = []
        let i = 0
        querySnapshot.forEach((doc) => {
          productArray.push(doc.data())
          productArray[i].id = doc.id
          product.push(productArray[i])
          i++
        })

        this.product = product
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
