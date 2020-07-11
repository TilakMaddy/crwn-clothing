import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyC8z35trNSEF3ThJlJafU-CpjdOqY0b_Bc",
  authDomain: "crwnclothingstore.firebaseapp.com",
  databaseURL: "https://crwnclothingstore.firebaseio.com",
  projectId: "crwnclothingstore",
  storageBucket: "crwnclothingstore.appspot.com",
  messagingSenderId: "848030805800",
  appId: "1:848030805800:web:ef32c72b94420599cc6a1d",
  measurementId: "G-YQ0JTFG7FM"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
//provider.setCustomParameters({ 'prompt' : 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;