// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-dMhgHglAMdtrpOhss5X6ll3yg_iFueY",
  authDomain: "developers-a5e3f.firebaseapp.com",
  projectId: "developers-a5e3f",
  storageBucket: "developers-a5e3f.appspot.com",
  messagingSenderId: "804977383960",
  appId: "1:804977383960:web:b1a720976423edf7d7c16d",
  measurementId: "G-3V29MVD8NL"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
