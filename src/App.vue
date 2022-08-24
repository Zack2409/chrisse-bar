<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { db } from "@/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import moment from 'moment'
import firebase from "firebase/compat/app";
import "firebase/auth";


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
  async created(){
    
      console.log(firebase.auth().currentUser)
    
    // const user = await firebase.auth().currentUser;
    // if (!user){
    //   this.$router.push({ name: "LoginPage" })
    // }else{
    //     return;
    // }
  },
 mounted(){

  const drinksCollection = query(collection(db, "drinks"), orderBy("name"));
  console.log('before mounted');
  onSnapshot(drinksCollection, (querySnapshot) => {
    const drinks = [];
    querySnapshot.forEach((doc) => {
       const drink = {
      id: doc.id,
      name: doc.data().name,
      price: Number(doc.data().price)
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
        date: doc.data().formatedDate,
        justDate: doc.data().justDate,
        justTime: doc.data().justTime
      }
        sales.push(sale)

        });
          
          // Getting an object with data grouped by dates
           let groupedSales = {};
        groupedSales = sales.reduce((acc, sale) => {
          if (!acc[sale.justDate]) {
            acc[sale.justDate] = [];
          }

          acc[sale.justDate].push(sale);

          return acc;
        }, {});

          // Changing that object to an array and calculating a total
          let newStuff = Object.entries(groupedSales);
          
          newStuff.forEach(thing => {
          const total = thing[1].reduce((acc, sale) => (
              acc += sale.total
          ), 0);
          thing.push(total);
          // console.log(thing)
          })
          this.$store.state.grouped = newStuff;

          //Getting sales data for current day

          let analyticsData = newStuff;
          analyticsData = analyticsData.filter(array => {
            return moment(array[0]).isSame(new Date(Date.now()).toLocaleString().split(',')[0]);
           })

           this.$store.state.daysData = analyticsData;

          //Getting data for line graph
          
          let chartData=[];
          let dates = [];
          let totals=[]

          newStuff.map(stuff => {
            const data = {
              date: stuff[0],
              total: stuff[2]
            }
          chartData.push(data)
          })

         

          chartData.map(data => {
            const sevenDays = moment().subtract(7, 'days');
            if(moment(data.date).isAfter(sevenDays)){
              dates.push(data.date);
              totals.push(data.total)
            }
          })

          // console.log(dates)
          
          this.$store.state.dates = dates;
          this.$store.state.totals = totals;

          
        })

 }
  });
</script>

<style scoped>
#line-chart{
  height: 300px !important;
  width: 300px I !important;
}
</style>