<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Add a Sale</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

      <img src="@/assets/beer1.svg"/>
      <div class="container">
       <ion-fab class="md">
      <ion-fab-button id="open-modal" expand="block" class="md ion-activatable ion-focusable">
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>

    <ion-button @click="signOut()">SignOut</ion-button>
    <!-- <ion-title class="title">Add a New Sale</ion-title> -->
    </div>
    <ion-modal ref="modal" trigger="open-modal">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="cancel()">Cancel</ion-button>
          </ion-buttons>
          <ion-title>Sales Details</ion-title>
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="addSale()">Confirm</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
  <ion-list>
  <ion-item>
    <ion-select 
    interface="action-sheet" 
    placeholder="Select Drink"  
    v-model="drinkName" 
    required
    @ionChange="checkPrice($event.detail)"
    >
      <ion-select-option
       v-for='drink, index in drinks'
       :key='index'
       :value="drink.name"
       :price="drink.price"
       
       >{{ drink.name }}
       </ion-select-option>
    </ion-select>
  </ion-item>
  </ion-list>

  
  <ion-item>
    <ion-label position="stacked" >Number of Shots</ion-label>
    <ion-input type="number" v-model='amtShot' ></ion-input>
  </ion-item>

  
      </ion-content>
    </ion-modal>
     
    
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonModal, IonInput, IonLabel, IonSelect, IonSelectOption, alertController } from '@ionic/vue';
import { add } from 'ionicons/icons';
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";
import moment from 'moment'
import firebase from "firebase/compat/app";
import "firebase/auth";
// import havingFun from '@/assets/havingFun.svg'
export default{
  name: 'Tab1Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonModal, IonInput, IonLabel, IonSelect, IonSelectOption},
data(){
  return{
    add,
    drinkName: '',
    amtShot: '',
    currentPrice: '',
    currentTransaction: {}
    
  }
},
 mounted(){
  const tabs = document.querySelectorAll('ion-tab-bar');
  Object.keys(tabs).map((key) => {
    tabs[key].style.display = 'flex';
 })
 },
 methods: {
      cancel() {
        this.$refs.modal.$el.dismiss(null, 'cancel');
       
      },
      confirm() {
        const name = this.$refs.input.$el.value;
        this.$refs.modal.$el.dismiss(name, 'confirm');
      },
      checkPrice(e) {
        const name = e.value;
        console.log(name)
        let filtered = this.$store.state.drinks;
        filtered = filtered.filter(eachDrink => {
          return eachDrink.name === name;
        })
        this.currentPrice = filtered[0].price;
        console.log(this.currentPrice)
      },
      async presentAlert(message) {
        const alert = await alertController.create({
        header: 'Alert',
        subHeader: 'Important message',
        message: message,
        buttons: ['OK']
      });
      await alert.present();
    },
    addSale(){
      if (this.drinkName==='' || this.amtShot <= 0){
        this.presentAlert('Please fill in all fields with valid data')
      } else {
      
      const date = new Date();
      const currentDate = 
        date.toLocaleTimeString([], {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        });
      
      addDoc(collection(db, "sales"), {
            name: this.drinkName,
            shotAmt: Number(this.amtShot),
            price: this.currentPrice,
            total: Number(this.amtShot)*this.currentPrice,
            formatedDate: currentDate,
            date: Date.now(),
            justDate: moment(new Date().now).format('l'),
            justTime: moment(new Date().now).format('LT')
          });
      this.presentAlert('Sale Successfully Added!');
      this.currentTransaction = {};
      this.drinkName = '';
      this.amtShot = '';
      this.currentPrice = '';
      }
      },
      signOut(){
        firebase.auth().signOut().then(() => {
          console.log('logged out')

          this.$router.go()
        })
        
      }
    },
    computed: {
      drinks(){
        return this.$store.state.drinks
      },
      sales(){
        return this.$store.state.sales
      }
    },
    
};
</script>

<style>
*{
  /* margin: 0;
  padding: 0; */
  box-sizing: border-box;
}

img{
  height: 300px;
  display: block;
  margin: 0 auto;
  margin-top: 90px;
  aspect-ratio:1;

}

.container{
  display: flex;
  position: absolute;
   width: 100vw;
   /* height: 70vh; */
  justify-content: center; 
}

ion-fab{
  position: fixed;
  top: 85%;
  right: 50%;
  transform: translateX(50%);
}
.title{
  position: relative;
  top: 6%;
}
.successBtn{
  padding-top: 5px;
  }

 /* * ::-webkit-scrollbar{
  display: none;
 } */


</style>