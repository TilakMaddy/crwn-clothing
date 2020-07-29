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
    console.log("snap doesnt exist", userAuth, additionalData);

    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch(err) {
      console.log('error creating user ', err.message);
    }
  }

  return userRef;

}

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
}

export const convertCollectionsSnapshotToMap = collections => {

  const transformedCollections = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()), // converts title string to URL-able format
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollections.reduce((accumulation, collection) => {
    const { title } = collection;
    accumulation[title.toLowerCase()] = collection;
    return accumulation;
  }, {});

}
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsub = auth.onAuthStateChanged(userAuth => {
      unsub();
      resolve(userAuth)
    }, reject);
  });
}


export const googleProvider = new firebase.auth.GoogleAuthProvider();
//googleProviderovider.setCustomParameters({ 'prompt' : 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;