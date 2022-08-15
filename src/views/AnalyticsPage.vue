<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Analytics</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
    <h6>Line Chart Showing Past Weeks Sales</h6>
   <div id="chart-wrapper">
    <LineChart />
   </div>
   <div class="outer-container">
    <div class="container">
      <h6 class="sales-title">Todays' Sales Data</h6>
      <div class="data-container">
        <div class="data">
          <h6 class="label">Sales</h6>
          <h6 class="content">{{daysData[0] ? daysData[0][1].length : '0'}}</h6>
        </div>
        <div class="data">
          <h6 class="label">Amount</h6>
          <h6 class="content">${{daysData[0] ? daysData[0][2].toFixed(2) : '0'}}</h6>
        </div>
      </div>
    </div>
   </div>
    
    </ion-content>
  </ion-page>
</template>

<script>
import{ IonPage, IonHeader, IonToolbar, IonContent } from '@ionic/vue'
import LineChart from '@/components/LineChart.vue'

export default {
name: 'AnalyticsPage',
components: {  LineChart, IonPage, IonHeader, IonToolbar, IonContent },
data(){
  return{
    data: [],
    daySales:'',
    dayTotal:''
  }
},
computed: {
      daysData(){
        return this.$store.state.daysData
      }
  
}
}
</script>

<style>
#chart-wrapper {
    display: block;
    margin: 0 auto;
    height: 300px;
    width: 300px;
  }

h6{
  text-align: center;
  color: black;
}

.sales-title{
  padding-bottom: 20px;
}

.outer-container{
  width: 100%;
  display: flex;
  justify-content: center;
}

.container{
  width: 80%;
  height: 170px;
  background: white;
  color: white;
  display: block;
  margin: 28px auto;
  border-radius: 3%;
}

.data-container{
display:flex;
justify-content: space-evenly;
}

.data{
  height: 100px;
  width: 100px;
  border-radius:5%;
  background: var(--ion-color-primary);
  color: white;
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0!important;
}

.label,
.content{
  color: white;
  /* padding-bottom: 23px; */
}

</style>