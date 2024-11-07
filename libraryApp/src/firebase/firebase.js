// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc, updateDoc, addDoc,getDoc , arrayRemove} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDdHTcMeiX2b4l_a-nqnoJkMX504cVxk4k",
    authDomain: "library-application-556bb.firebaseapp.com",
    projectId: "library-application-556bb",
    storageBucket: "library-application-556bb.firebasestorage.app",
    messagingSenderId: "438688835589",
    appId: "1:438688835589:web:7977b1ebbece125ae1946c"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs, doc, setDoc, updateDoc, addDoc,getDoc,arrayRemove };
