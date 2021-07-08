// ****************************FireBase******************
// import statement
import firebase from "firebase/app"
// auth = > authenication
import "firebase/auth"
// storage => db
import 'firebase/storage'
// firestore => collection like user,comments,post
import 'firebase/firestore'

// initialise firebase App 
firebase.initializeApp(
    {
    apiKey: "AIzaSyBcnDrlIAuEUnsFlwhcn3FyumwAbgirQiM",
    authDomain: "reels-99026.firebaseapp.com",
    projectId: "reels-99026",
    storageBucket: "reels-99026.appspot.com",
    messagingSenderId: "251469578503",
    appId: "1:251469578503:web:c21eddcb399423fa74c5a2"
      }
)
// export auth
export const auth = firebase.auth();
// get firestore => we don't import firestore directly. Because if u export directly then anyone can make collection in our firebase.
const firestore = firebase.firestore();
// export database
export const database ={
    // create users
    users:firestore.collection('users'),
    // getCurrentTimeStamp =>  time when user login .
    getCurrentTimeStamp : firebase.firestore.FieldValue.serverTimestamp
}
// export storage
export const storage = firebase.storage();
