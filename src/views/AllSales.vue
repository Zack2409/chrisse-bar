<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>All Sales Info</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

  <ion-accordion-group>
    <ion-accordion 
    v-for="(group, index) in grouped"
    :key="index"
    >
      <ion-item slot="header" color="light">
        <ion-label v-if="moment(group[0]).isSame(new Date(Date.now()).toLocaleString().split(',')[0])">Today ({{ group[1].length }})</ion-label>
        <ion-label v-else-if="moment(group[0]).isSame(moment(new Date(Date.now()).toLocaleString().split(',')[0]).subtract(1, 'days'))">Yesterday ({{ group[1].length }})</ion-label>
        <ion-label v-else>{{ moment(group[0]).format('LL') }} ({{ group[1].length }})</ion-label>
        
      </ion-item>
       <ion-card
        slot="content"
        v-for="(sale,index) in group[1]"
        :key="index">
        <ion-card-header>
          <ion-card-subtitle>{{ sale.justTime }}</ion-card-subtitle>
          <ion-card-title>{{ sale.name }}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          {{ `Sold ${sale.shotAmt} ${sale.shotAmt>1? 'shots/bottles' : 'shot/bottle'} of ${sale.name} @ $${sale.price.toFixed(2)}. The total equated to $${sale.total.toFixed(2)}` }}
        </ion-card-content>
      </ion-card>
      <ion-item slot="content">
        <ion-label slot="end">Total for the day: ${{group[2].toFixed(2)}}</ion-label>
      </ion-item>
    </ion-accordion>
  </ion-accordion-group>
    </ion-content>
  </ion-page>
</template>

<script>

import { IonPage, IonAccordionGroup, IonAccordion, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import moment from 'moment'
export default({
  name: 'Tab2Page',
  data(){
    return{
      moment
    }
  },
  components: { IonHeader, IonAccordionGroup, IonAccordion, IonToolbar, IonTitle, IonContent, IonPage  },
  computed: {
    sales(){
        return this.$store.state.sales
      },
      grouped(){
        return this.$store.state.grouped
      }
      },
  methods: {
    test(){
      const sales = this.$store.state.sales;
      console.log(sales);
    }
  }
});
</script>

<style>

</style>
