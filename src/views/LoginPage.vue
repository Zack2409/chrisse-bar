<template>
  <ion-page>
    <!-- <ion-header> -->
    <!-- <ion-toolbar> 
        
     </ion-toolbar> -->
    <!-- </ion-header> -->
    <ion-content :fullscreen="true">
    
    <div class="content">
        <h1>Login</h1>
        <div class="header">
            <ion-label>Login into your admin account</ion-label>
        </div>
        <div class="input-container">
          <input type="text" placeholder="Email" v-model="email">
          <input type="password" placeholder="Password" v-model="password">
        <div v-if="error" class="error">{{ this.errorMsg }}</div>
       </div>
       
    </div>
    <ion-button @click='signIn()' color="primary" expand="block">Login</ion-button>
    </ion-content>
    
  </ion-page>
</template>

<script>
 
import { IonPage, IonHeader, IonTitle, IonToolbar, IonContent, IonButton } from '@ionic/vue'
import firebase from "firebase/compat/app";
import "firebase/auth";

export default {
name: 'LoginPage',
components: IonPage, IonHeader, IonTitle, IonToolbar, IonContent, IonButton,
mounted(){
  const tabs = document.querySelectorAll('ion-tab-bar');
  Object.keys(tabs).map((key) => {
    tabs[key].style.display = 'none';
  
});
},
data(){
  return{
    email: '',
    password: '',
    error: false,
    errorMsg: ''
  }
},
methods: {
  signIn(){
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
    .then(() => {
      this.$router.push({ name: "NewSale"});
      this.error = false;
      this.errorMsg= '';
      console.log(firebase.auth().currentUser.uid);

    }).catch(err => {
      this.error = true;
      this.errorMsg = err.message
      console.log(this.errorMsg)
    })
  }
}
}
</script>

<style>
  .content{
    display: flex!important;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-top: 20%;
    padding-bottom: 0;
  }

  h1{
    color: var(--ion-color-primary);
    padding-bottom: 5px;
  }

 

  .input-container{
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    
  }

  input{
    background: #eee;
    margin: 20px;
    padding: 15px;
    border-radius: 20px;
    border: none;
  }

  @media (max-width: 500px){
    .content{
      padding-top: 40%;
    }
  }

  .error{
  text-align: center;
  font-size: 12px;
  color: red;
}

  ion-button{
    margin: 0 40px;
  }

</style>