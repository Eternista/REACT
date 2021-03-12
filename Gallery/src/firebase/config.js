import firebase from "firebase/app"
import 'firebase/storage';
import 'firebase/firestore';
import "firebase/auth"

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD4pPU0qWBuQo4Vs3obLx30V-U-oEJjDmo",
    authDomain: "rafal-gallery.firebaseapp.com",
    projectId: "rafal-gallery",
    storageBucket: "rafal-gallery.appspot.com",
    messagingSenderId: "597881999732",
    appId: "1:597881999732:web:2679ec6ad025d98ba79c21"
  };
   // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {projectStorage, projectFirestore, timestamp};
export const auth = firebase.auth()
