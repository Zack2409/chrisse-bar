<template>
<ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Add a New Drink</ion-title>
        
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
        <ion-item>
            <ion-label>Hello There!</ion-label>
        </ion-item>
    </ion-content>
</ion-page>



<!-- 
<ion-content>
  <ion-modal ref="modal" trigger="open-modal">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="cancel()">Cancel</ion-button>
          </ion-buttons>
          <ion-title>Add a New Drink</ion-title>
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="addDrink()">Confirm</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
          <ion-label position="stacked">Enter the Drink Name</ion-label>
          <ion-input ref="input" type="text" placeholder="Your name" v-model="drinkName"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Enter the Price per Shot</ion-label>
          <ion-input ref="input" type="number" placeholder="The Price" v-model="drinkPrice"></ion-input>
        </ion-item>
      </ion-content>
    </ion-modal>
</ion-content> -->
</template>

<script>
import {IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonContent,
IonItem, Ionlabel, IonInput } from '@ionic/vue';

export default {
 name: 'modalComponent',
 component: {
    IonModal, 
    IonHeader, 
    IonToolbar, 
    IonButtons, 
    IonButton, 
    IonContent,
    IonItem, 
    Ionlabel, 
    IonInput 
    } 
}
</script>

<style>

</style>