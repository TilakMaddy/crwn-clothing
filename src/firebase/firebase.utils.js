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

export const createUserProfileDocument = async (userAuth, additionalData) => {

  if(!userAuth)
    return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if(!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch(err) {
      console.log('error creating user ', err.message);
    }
  }

  return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
//provider.setCustomParameters({ 'prompt' : 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;