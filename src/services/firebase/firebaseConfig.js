import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAmxDQPzJvb2ZzuR9-vyCeG70LQvDJFQ8c",
  authDomain: "proyectocoder-f41d1.firebaseapp.com",
  projectId: "proyectocoder-f41d1",
  storageBucket: "proyectocoder-f41d1.appspot.com",
  messagingSenderId: "855285843162",
  appId: "1:855285843162:web:21cd70318dd510a022d1e3"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)