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
            <v-layout wrap >
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="outletData.nama" label="Nama" required :rules="namaRules"
              :counter="15"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="outletData.username"  label="Username" hint="example of helper text only on focus" :rules="usernameRules" :counter="25"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
              v-model="outletData.password"
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Normal with hint text"
              hint="At least 10 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
                <!-- <v-text-field v-model="outletData.password" label="Password" hint="example of persistent helper text" required :rules="passwordRules" :counter="10"></v-text-field> -->
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="outletData.no_hp"  label="No. Hp" hint="example of helper text only on focus" :rules="no_hpRules" :counter="12"></v-text-field>
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
          <v-btn color="blue darken-1" flat @click="tambahData">Save</v-btn>
        </v-card-actions>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- +++++++++++++++++++++++++++++edit++++++++++++++++++++++++++++ -->
    <v-dialog v-model="dialogedit" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">Outlet</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap >
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editoutletData.nama" label="Nama" required :rules="namaRules"
              :counter="15"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editoutletData.username"  label="Username" hint="example of helper text only on focus" :rules="usernameRules" :counter="25"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
              v-model="editoutletData.password"
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Normal with hint text"
              hint="At least 10 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
                <!-- <v-text-field v-model="outletData.password" label="Password" hint="example of persistent helper text" required :rules="passwordRules" :counter="10"></v-text-field> -->
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="editoutletData.no_hp"  label="No. Hp" hint="example of helper text only on focus" :rules="no_hpRules" :counter="12"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                 <v-select :items="['Onsite', 'on delevery']" label="Type" required v-model="editoutletData.type"  ></v-select>
              </v-flex>
              <v-flex xs12 >
                 <v-textarea name="alamat" label="Alamat" v-model="editoutletData.alamat"  hint="Hint text"></v-textarea>
              </v-flex>
              <v-flex xs12 >
                 <v-textarea name="deskripsi" label="Deskripsi" v-model="editoutletData.deskripsi"  hint="Hint text"></v-textarea>
              </v-flex>
            </v-layout>
            <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialogedit = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="UpdateItem(editoutletData.id)">Save</v-btn>
        </v-card-actions>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
  </div>
  <div class="card-body">
        <v-data-table
        :headers="headers"
        :items="kos"
        :search="search"
        class="elevation-1"
        >
<template slot="items" slot-scope="props">
<td>{{ props.item.nama }}</td>
<td class="text-xs-right">{{ props.item.username }}</td>
<td class="text-xs-right">{{ props.item.password }}</td>
<td class="text-xs-right">{{ props.item.no_hp }}</td>
<td class="text-xs-right">{{ props.item.type }}</td>
<td class="text-xs-right">{{ props.item.alamat }}</td>
<td class="text-xs-right">{{ props.item.deskripsi }}</td>
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
  name: 'outlet',
  components: {
    'vtoolbar': Toolbar,
    'vfooter': Footer
  },
  data () {
    return {
      show1: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ('The email and password you entered don\'t match')
      },
      namaRules: [
        v => !!v || 'Name is required',
        v => v.length <= 15 || 'Name must be less than 15 characters'
      ],
      usernameRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      no_hpRules: [
        v => !!v || 'Phone number is required',
        v => v.length <= 12 || 'Name must be less than 12 characters'
      ],
      search: '',
      editId: '',
      headers: [
        {
          text: 'Nama Outlet',
          align: 'left',
          sortable: true,
          value: 'nama'
        },
        { text: 'Username', value: 'username', align: 'right' },
        { text: 'Password', value: 'password', align: 'right' },
        { text: 'No. Hp', value: 'no_hp', align: 'right' },
        { text: 'Type', value: 'type', align: 'right' },
        { text: 'Alamat', value: 'alamat', align: 'right' },
        { text: 'Deskripsi', value: 'deskripsi', align: 'right' },
        { text: 'Aksi', value: 'aksi', align: 'right' }
      ],
      outletData: {
        'nama': '',
        'username': '',
        'password': '',
        'no_hp': '',
        'type': '',
        'alamat': '',
        'deskripsi': ''
      },
      editoutletData: {
        'id': '',
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
  created () {
    this.getOutlet()
  },
  computed: {
    sortedCustomer () {
      return this.kos.slice().sort((a, b) => {
        return a.nama - b.nama
      })
    }
  },
  methods: {
    tambahData () {
      db.collection('outlet').add(this.outletData).then(this.getOutlet)
      this.outletData.nama = ''
      this.outletData.username = ''
      this.outletData.password = ''
      this.outletData.no_hp = ''
      this.outletData.type = ''
      this.outletData.alamat = ''
      this.outletData.deskripsi = ''
      this.$vs.notify({ title: 'Sukses!!', text: 'Data Berhasil Ditambahkan!!', color: 'primary', icon: 'done_all' })
      this.dialog = false
    },
    hapus (id) {
      if (confirm('Apakah anda yakin untuk menghapus data ini ?')) {
        db.collection('outlet').doc(id).delete().then((data) => {
          this.getCustomer()
          this.dialogDel = false
          this.$vs.notify({title: 'Notif', text: 'Data Terhapus!', color: 'danger', icon: 'warning'})
        })
      }
    },
    editItem (item) {
      this.editId = item.id
      this.editoutletData.id = item.id
      this.editoutletData.nama = item.nama
      this.editoutletData.username = item.username
      this.editoutletData.password = item.password
      this.editoutletData.no_hp = item.no_hp
      this.editoutletData.type = item.type
      this.editoutletData.alamat = item.alamat
      this.editoutletData.deskripsi = item.deskripsi
      this.dialogedit = true
    },
    UpdateItem (id) {
      db.collection('outlet').doc(id).set(this.editoutletData).then(this.getOutlet, this.dialogedit = false, this.$vs.notify({title: 'Notif', text: 'Data Berhasil Diubah!', color: 'warning', icon: 'warning'}))
      this.editId = ''
      this.editoutletData.nama = ''
      this.editoutletData.username = ''
      this.editoutletData.password = ''
      this.editoutletData.no_hp = ''
      this.editoutletData.type = ''
      this.editoutletData.alamat = ''
      this.editoutletData.deskripsi = ''
    },
    getOutlet () {
      db.collection('outlet').get().then(querySnapshot => {
        const outlet = []
        const outletArray = []
        let i = 0
        querySnapshot.forEach((doc) => {
          outletArray.push(doc.data())
          outletArray[i].id = doc.id
          outlet.push(outletArray[i])
          i++
        })

        this.kos = outlet
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
