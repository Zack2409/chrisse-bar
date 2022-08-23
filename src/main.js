import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from '@/store';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { IonicVue } from '@ionic/vue';

import VueSvgInlinePlugin from "vue-svg-inline-plugin";

library.add(fas);

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';


// firebase


const firebaseConfig = {
  apiKey: "AIzaSyDHzBSIDCQacrMlXObqOnK1itbnkZT9cCM",
  authDomain: "chrisee-dddb9.firebaseapp.com",
  projectId: "chrisee-dddb9",
  storageBucket: "chrisee-dddb9.appspot.com",
  messagingSenderId: "309689253807",
  appId: "1:309689253807:web:af4c12633ffa2b089b795a"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const db=firebaseApp.firestore();

let app;
firebase.auth().onAuthStateChanged(() => {
  if(!app){
    createApp(App)
  .use(IonicVue)
  .use(router)
  .component('FontAwesome', FontAwesomeIcon)
  .use(store)
  .use(VueSvgInlinePlugin, {
    attributes: {
      data: [ "src" ],
      remove: [ "alt" ]
    }
  })
  .mount('#app')
  }
})


// const auth = getAuth(firebaseApp);

// const app = createApp(App)
//   .use(IonicVue)
//   .use(router)
//   .component('FontAwesome', FontAwesomeIcon)
//   .use(store)
//   .use(VueSvgInlinePlugin, {
//     attributes: {
//       data: [ "src" ],
//       remove: [ "alt" ]
//     }
//   })
  
// router.isReady().then(() => {
//   app.mount('#app');
// });

export { timestamp, db };