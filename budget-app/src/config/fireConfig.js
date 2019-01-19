import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseKeys from './firebase_keys'

// Initialize Firebase
const config = {
  apiKey: firebaseKeys.FIREBASE_APIKEY,
  authDomain: firebaseKeys.FIREBASE_AUTHDOMAIN,
  databaseURL: firebaseKeys.FIREBASE_DATABASE_URL,
  projectId: firebaseKeys.FIREBASE_PROJECTID,
  storageBucket: firebaseKeys.FIREBASE_STORAGEBUCKET,
  messagingSenderId: firebaseKeys.FIREBASE_MESSAGINGSENDERID,
}
firebase.initializeApp(config)

export default firebase
