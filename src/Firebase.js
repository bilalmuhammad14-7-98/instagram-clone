// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyABX7mODkv-K_k1Fda739LN-beLjko9qHo",
    authDomain: "instagram-clone-react-e59af.firebaseapp.com",
    projectId: "instagram-clone-react-e59af",
    storageBucket: "instagram-clone-react-e59af.appspot.com",
    messagingSenderId: "543160928781",
    appId: "1:543160928781:web:941d1e62a7fac5af0ce344",
    measurementId: "G-472W7T9R76"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

export {db, auth, storage};
  

