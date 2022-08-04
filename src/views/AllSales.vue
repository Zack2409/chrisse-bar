<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>All Sales Info</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-card v-for="sale,index in sales"
        :key="index">
    <ion-card-header>
      <ion-card-subtitle>{{ sale.date }}</ion-card-subtitle>
      <ion-card-title>{{ sale.name }}</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      {{ `Sold ${sale.shotAmt} ${sale.shotAmt > 1? 'shots/bottles' : 'shot/bottle'} of ${sale.name} @ $${sale.price.toFixed(2)}. The total equated to $${sale.total.toFixed(2)}` }}
    </ion-card-content>
  </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

export default defineComponent({
  name: 'Tab2Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  computed: {
    sales(){
        return this.$store.state.sales
      }
  }
});
</script>

<style>

  ion-row{
    padding: 10px;
  }

  ion-col{
    border: 1px solid white;
    margin: 10px;
  }
</style>
