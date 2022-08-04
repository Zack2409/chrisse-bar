<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { db } from "@/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";


export default({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  data(){
    return {
      name: 'tea',
      price: '4'
    }
  },
 mounted(){
  const drinksCollection = query(collection(db, "drinks"), orderBy("name"));
  console.log('mounted');
  onSnapshot(drinksCollection, (querySnapshot) => {
    const drinks = [];
    querySnapshot.forEach((doc) => {
       const drink = {
      id: doc.id,
      name: doc.data().name,
      price: doc.data().price,
    }
    drinks.push(drink)
    })
    this.$store.state.drinks = drinks;
  })

  const salesCollection = query(collection(db, "sales"), orderBy("date", "desc"));
  onSnapshot(salesCollection, (querySnapshot) => {
    const sales = [];
    querySnapshot.forEach((doc) => {
      const sale = {
        id: doc.id,
        name: doc.data().name,
        shotAmt: doc.data().shotAmt,
        price: Number(doc.data().price),
        total: Number(doc.data().total),
        date: doc.data().formatedDate
      }
        sales.push(sale)
  });
    this.$store.state.sales = sales;
    console.log(this.$store.state.sales)


  })
 }
  });
</script>