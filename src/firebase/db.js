import firebase from "firebase/compat/app";
import "firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAjc5_z6bPRLjgFKEQdlNXklSfexsfdrns",
  authDomain: "vue-todo-firebase-7a728.firebaseapp.com",
  projectId: "vue-todo-firebase-7a728",
  storageBucket: "vue-todo-firebase-7a728.appspot.com",
  messagingSenderId: "310483600581",
  appId: "1:310483600581:web:d1d35f16b49220b1f19cac",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const storage = firebase.storage();
