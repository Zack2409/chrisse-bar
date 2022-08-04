<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar>
        <ion-tab-button tab="tab1" href="/tabs/NewSale" layout="icon-top">
          <ion-icon :icon="add"></ion-icon>
          <ion-label>New Sale</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="tab2" href="/tabs/AllSales">
          <ion-icon :icon="list"></ion-icon>
          <ion-label>All Sales</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href='/tabs/alldrinks'>
          <ion-icon :icon="wine"></ion-icon>
          <ion-label>All Drinks</ion-label>
        </ion-tab-button>
        
        
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>

import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { add, list, wine } from 'ionicons/icons';

export default ({
  name: 'TabsPage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  data(){
    return {
      list,
      add,
      wine
    }
  }
});
</script>
