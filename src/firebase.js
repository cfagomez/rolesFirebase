import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'

const firebaseConfig = {
  apiKey: "AIzaSyClyDra7266BIwZBrICXmXMhS2OlhUwoI8",
  authDomain: "roles-proyecto.firebaseapp.com",
  projectId: "roles-proyecto",
  storageBucket: "roles-proyecto.appspot.com",
  messagingSenderId: "885213526424",
  appId: "1:885213526424:web:f7bd393f5b9af68cb453ed"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()
const functions = firebase.functions()

export {firebase, db, auth, functions}