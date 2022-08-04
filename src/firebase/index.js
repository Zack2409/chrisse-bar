
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHzBSIDCQacrMlXObqOnK1itbnkZT9cCM",
  authDomain: "chrisee-dddb9.firebaseapp.com",
  projectId: "chrisee-dddb9",
  storageBucket: "chrisee-dddb9.appspot.com",
  messagingSenderId: "309689253807",
  appId: "1:309689253807:web:af4c12633ffa2b089b795a"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db
}