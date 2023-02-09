// import Listing from './pages/Listing'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKF9dNmZBV4igc9wdoPt_A32V-sDt2fog",
  authDomain: "realtor3-d6318.firebaseapp.com",
  projectId: "realtor3-d6318",
  storageBucket: "realtor3-d6318.appspot.com",
  messagingSenderId: "700844975018",
  appId: "1:700844975018:web:34cd38db961c51259f81d3"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);
export const db = getFirestore()
// const db = getFirestore()
// const auth = getAuth(app)