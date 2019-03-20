<!-- <template>
<v-app id="inspire">
<vtoolbar></vtoolbar>
<v-content>
<b-container class="bv-example-row">
<b-row >
<b-col></b-col>
<b-col cols="12">

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
  	beforeCreate (){
	  // db.collection('products').where(doc.id, '==' this.$route.params.id).then(querySnapshot =>{
	  //   const products = []
	  //   const productsArray = []
	  //   let i = 0
	  //   querySnapshot.forEach((doc)=>{
	  //     productsArray.push(doc.data())
	  //     productsArray[i].id = doc.id
	  //     products.push(productsArray[i])
	  //     i++
	  //   })
	  //   this.products = products
	  // })
	var docRef = db.collection('outlet').doc(this.$route.params.id);
	docRef.get().then((doc)=> {
	    if (doc.exists) {
	        console.log("Document data:", doc.data().nama);
	        this.productId = doc.data().product_id
	        this.productName = doc.data().product_name
	        this.productPrice = doc.data().product_price
	        this.loaded = true
	    } else {
	        // doc.data() will be undefined in this case
	        console.log("No such document!");
	    }
	}).catch(function(error) {
	    console.log("Error getting document:", error);
	});

  }
    onSubmit () {
      db.collection('outlet').add(this.outletData).then(this.readData)
      this.outletData.nama = ''
      this.outletData.username = ''
      this.outletData.password = ''
      this.outletData.no_hp = ''
      this.outletData.type = ''
      this.outletData.alamat = ''
      this.outletData.deskripsi = ''
      // alert('Data Berhasil Ditambahkan!')
      this.$vs.notify({title: 'Sukses!!', text: 'Data Berhasil Ditambahkan!!', color: 'primary', icon: 'done_all', position: 'top-right'})
      this.dialog = false
      // this.readData()
    },
    readData () {
      db.collection('outlet').get().then(querySnapshot => {
        const kos = []
        const kosArray = []
        let i = 0
        querySnapshot.forEach((doc) => {
          kosArray.push(doc.data())
          kosArray[i].id = doc.id
          kos.push(kosArray[i])
          i++
        })

        this.kos = kos
      })
    },
    hapus (id) {
      db.collection('outlet').doc(id).delete().then((data) => {
        this.readData()
        this.dialogDel = false
        function getRandomInt (min, max) {
          return Math.floor(Math.random() * (max - min)) + min
        }
        this.$vs.notify({title: 'Notif', text: 'Data Terhapus!', color: 'primary', position: 'top-right', icon: 'warning'})
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
 -->