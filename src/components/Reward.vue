<template>
<v-app id="inspire">
<vtoolbar></vtoolbar>
<v-content>
<b-container class="bv-example-row">
<b-row >
<b-col>
  <v-container grid-list-md>
<div class="card">
  <div class="card-header">
  <b>Add Data Reward</b>
  </div>
  <div class="card-body">
  <v-layout wrap >
    <v-flex xs12 sm6 md5>
      <v-text-field label="Product" v-model="rewardData.product" box></v-text-field>
        </v-flex>
    <v-flex xs12 sm6 md5>
      <v-text-field label="Point" v-model="rewardData.point" box type="number"></v-text-field>
        </v-flex>
    <v-flex xs12 sm6 md2>
    <v-btn fab dark color="light-blue darken-1">
      <v-icon dark @click="tambahData">add</v-icon>
    </v-btn>
        </v-flex>

  <!-- +++++++++++++++++++++++++++++edit++++++++++++++++++++++++++++ -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Reward</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm md6 >
                <v-text-field label="Nama" v-model="editrewardData.product" box required></v-text-field>
              </v-flex>
              <v-flex xs12 sm md6>
                <v-text-field label="Point" v-model="editrewardData.point" box hint="example of helper text only on focus" type="number"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="UpdateItem(editrewardData.id)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      </v-layout>
  </div>
  </div>
  </v-container>
</b-col>
<b-col cols="12">
  <v-container grid-list-md>
<div class="card">
  <div class="card-header">
    <v-layout row justify-left>
      <template>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </template>
  </v-layout>
  </div>
      <div class="card-body">
        <v-data-table
        :headers="headers"
        :items="reward"
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
        class="elevation-1"
        >
<template slot="items" slot-scope="props">
<td>{{ props.item.product }}</td>
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
  </v-container>
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
  name: 'Reward',
  components: {
    'vtoolbar': Toolbar,
    'vfooter': Footer
  },

  data () {
    return {
      rowsPerPageItems: [3, 5, 10, 25],
      pagination: {
        rowsPerPage: 3
      },
      search: '',
      editId: '',
      rewardData: {
        'product': '',
        'point': ''
      },
      editrewardData: {
        'id': '',
        'product': '',
        'point': ''
      },
      headers: [

        {
          text: 'Product',
          align: 'left',
          sortable: true,
          value: 'product'
        },
        { text: 'Point', value: 'point', align: 'right' },
        { text: 'Aksi', value: 'aksi', align: 'right' }

      ],
      dialog: false,
      reward: []
    }
  },
  created () {
    this.getReward()
  },

  methods: {
    tambahData () {
      db.collection('reward').add(this.rewardData).then(this.getReward)
      this.rewardData.product = ''
      this.rewardData.point = ''
      this.$vs.notify({title: 'Sukses!!', text: 'Data Berhasil Ditambahkan!!', color: 'primary', icon: 'done_all'})
    },
    hapus (id) {
      if (confirm('Apakah anda yakin untuk menghapus data ini ?')) {
        db.collection('reward').doc(id).delete().then((data) => {
          this.getReward()
          this.$vs.notify({title: 'Notif', text: 'Data Terhapus!', color: 'danger', icon: 'warning'})
        })
      }
    },
    editItem (item) {
      this.editId = item.id
      this.editrewardData.id = item.id
      this.editrewardData.product = item.product
      this.editrewardData.point = item.point
      this.dialog = true
    },
    UpdateItem (id) {
      db.collection('reward').doc(id).set(this.editrewardData).then(this.getReward,
        this.dialog = false, this.$vs.notify({title: 'Notif', text: 'Data Berhasil Diubah!', color: 'warning', icon: 'warning'}))
      this.editId = ''
      this.editrewardData.product = ''
      this.editrewardDataData.point = ''
    },
    getReward () {
      db.collection('reward').get().then(querySnapshot => {
        const reward = []
        const rewardArray = []
        let i = 0
        querySnapshot.forEach((doc) => {
          rewardArray.push(doc.data())
          rewardArray[i].id = doc.id
          reward.push(rewardArray[i])
          i++
        })

        this.reward = reward
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
