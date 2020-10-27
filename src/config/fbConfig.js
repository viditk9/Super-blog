import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
  apiKey: "AIzaSyCmu26kalM6BYPu9o-CLYk-rF2KLMI2SCY",
  authDomain: "super-blogsite.firebaseapp.com",
  databaseURL: "https://super-blogsite.firebaseio.com",
  projectId: "super-blogsite",
  storageBucket: "super-blogsite.appspot.com",
  messagingSenderId: "568073912715",
  appId: "1:568073912715:web:2d9d2f238e778935e12f8e",
  measurementId: "G-41DPLR5XVY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
export default firebase;
