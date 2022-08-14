<template>
    <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title slot="start">Show All Drinks</ion-title>
        <ion-icon 
        slot='end' 
        class='addCircle'  
        size="large" 
        :icon="addCircle"
         @click="setOpen(true)"
         ></ion-icon>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      
      <ion-list>
         <ion-item v-for="(drink,index) in drinks"
         :key="index"
         id="hover-trigger">
             <ion-label>{{ drink.name }}</ion-label>
             <ion-label>${{ parseFloat(drink.price).toFixed(2) }}</ion-label>
           <ion-button
            @click="openPopover($event, drink)"
            fill="clear">
            <!-- <ion-icon size="small" :icon="arrowDown"></ion-icon> -->
            <!-- <ion-icon :src="moreVert"></ion-icon> -->
            <FontAwesome icon="fa-info" />
            </ion-button>
          </ion-item>  
      </ion-list>
       <ion-fab>
      <ion-fab-button @click="setOpen(true)">
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
      
      <ion-popover
       :is-open="popoverOpen"
       :event="event"
       @didDismiss = "popoverOpen = false" >
        <ion-content class="ion-padding">
            <ion-item>
                <ion-button class="color" @click="editDrink()" id="openModal" expand="block" type="block" fill="clear">
                    <ion-icon :icon="create"></ion-icon>
                    <ion-label>Edit</ion-label>
                    
                </ion-button>
            </ion-item>
            <ion-item>
                <ion-button class="color" @click="deleteDrink()" type="block" fill="clear">
                    <ion-icon :icon="trash"></ion-icon>
                    <ion-label>Delete</ion-label>
                    
                </ion-button>
            </ion-item>
        </ion-content>
      </ion-popover>
      
      
      <ion-modal :is-open="isOpen">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="cancel()">Cancel</ion-button>
          </ion-buttons>
          <ion-title>{{ editing ? 'Update Drink' : 'Add a New Drink'}}</ion-title>
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="functionality()">{{ editing ? 'Update' : 'Confirm' }}</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
          <ion-label position="stacked">Enter the Drink Name</ion-label>
          <ion-input ref="input" type="text" placeholder="Your name" v-model="drink.name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Enter the Price per Shot</ion-label>
          <ion-input ref="input" type="number" placeholder="The Price" v-model="drink.price"></ion-input>
        </ion-item>
      </ion-content>
    </ion-modal>

    </ion-content>
    </ion-page>
</template>

<script>

import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton,
    IonModal,
    IonItem,
    IonInput,
    IonLabel,
    IonPopover,
    alertController  } from '@ionic/vue'

import { arrowDown, add, trash, create, moreVert } from 'ionicons/icons';
import { db } from "@/firebase";
import { collection, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
 

export default {
    name: 'Tab3Page',
    components: {
        IonPage, 
        IonHeader,
        IonToolbar,
        IonContent,
        IonTitle,
        IonButton,
        IonModal,
        IonItem,
        IonInput,
        IonLabel,
        IonPopover
    },
    data(){
        return{
        arrowDown,
        add,
        trash,
        create,
        moreVert,
        drink: {
            name: '',
            price: ''
        },
        newDrink: {},
        popoverOpen: false,
        event: null,
        currrentEdit: '',
        isOpen: false,
        editing: false,
        index: '',
        allDrinks: []
        }
    },
    mounted(){
    
    },
    methods: {
        setOpen(isOpen) {
        this.isOpen = isOpen;
      },
         openPopover(e, drink) {
            this.event = e;
            this.popoverOpen = true;
            this.currentEdit = drink;
            console.log(this.currentEdit);
        },
        deleteDrink(){
        
        deleteDoc(doc(db, "drinks", this.currentEdit.id));
            this.popoverOpen = false;
            this.currentEdit = {};
            this.presentAlert('Drink deleted')
        },

        editDrink(){
           this.editing = true;
           this.drink = this.currentEdit;
           this.isOpen = true;
           this.popoverOpen = false;
        },
        cancel() {
        this.isOpen = false;
        this.editing = false;
        this.drink = {}
        },
        addDrink(){

          if(this.drink.name.length === 0 || this.drink.price <= 0){
            this.presentAlert('Please fill in all fields with valid data')
          } else {
          
          addDoc(collection(db, "drinks"), {
            name: this.drink.name.charAt(0).toUpperCase() + this.drink.name.slice(1),
            price: Number(this.drink.price)
          });
          this.presentAlert('Drink successfully added')
           this.isOpen = false;
          this.drink = {};    
        }},
        updateDrink(){
            if(this.drink.name.length === 0 || this.drink.price <= 0){
              this.presentAlert('Please fill in all fields with valid data')
            } else {
            const id = this.currentEdit.id;
            const drink = doc(db, "drinks", id);
            updateDoc(drink, {
              name: this.drink.name.charAt(0).toUpperCase() + this.drink.name.slice(1),
              price: this.drink.price
            });
            this.presentAlert('Drink has been updated')
            this.isOpen = false;
            this.drink = {};
            }
        },
        functionality(){
        if (this.editing === true){
            this.updateDrink();
        }
         else      
            this.addDrink();
        },
        async presentAlert(message) {
        const alert = await alertController.create({
        header: 'Alert',
        subHeader: 'Important message',
        message: message,
        buttons: ['OK']
      });

      await alert.present();
    }
    },
    computed: {
        drinks(){
        return this.$store.state.drinks
      }
    }
}
</script>

<style>
    ion-label{
        padding-left:10px;
    }

    ion-toolbar{
      padding-right: 16px;
    }

</style>