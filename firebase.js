import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth,onAuthStateChanged
    ,signInWithEmailAndPassword,sendEmailVerification,GoogleAuthProvider,signInWithPopup,
    sendPasswordResetEmail,deleteUser, createUserWithEmailAndPassword,signOut
   } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
   import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy,where } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
  
  
  const firebaseConfig = {
    apiKey: "AIzaSyAxyVu0Ad3YcAtx3RbMgPv5Xjrsz7IpwIw",
    authDomain: "test-app-eaec4.firebaseapp.com",
    projectId: "test-app-eaec4",
    storageBucket: "test-app-eaec4.firebasestorage.app",
    messagingSenderId: "44175850215",
    appId: "1:44175850215:web:25b2b33a2dd5c8d6a58042"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
 const provider = new GoogleAuthProvider();
 const db = getFirestore();


 export{ app,auth, db,getFirestore,
    onAuthStateChanged,signInWithEmailAndPassword,sendEmailVerification,
    GoogleAuthProvider,provider,signInWithPopup,sendPasswordResetEmail,deleteUser,createUserWithEmailAndPassword,
    signOut, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy,where}

