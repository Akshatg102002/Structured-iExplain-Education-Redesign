
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  // Added getDoc to imports
  getDoc,
  addDoc, 
  deleteDoc, 
  doc, 
  // Added updateDoc to imports
  updateDoc,
  serverTimestamp, 
  query, 
  orderBy, 
  where, 
  setDoc,
  onSnapshot
} from "firebase/firestore";
import { 
  getStorage, 
  ref, 
  uploadBytesResumable, 
  getDownloadURL, 
  deleteObject 
} from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyAerlaB_Lb05q9gqErAjNxOemiijuhO3f0",
  authDomain: "iexplainwebsite.firebaseapp.com",
  projectId: "iexplainwebsite",
  storageBucket: "iexplainwebsite.appspot.com",
  messagingSenderId: "438305327858",
  appId: "1:438305327858:web:18713e75400a609c25de6b",
  measurementId: "G-JZDRBBZL2S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Export centralized instances and methods
export { 
  db, 
  storage,
  collection, 
  getDocs, 
  // Exporting getDoc so it can be used in components like App
  getDoc,
  addDoc, 
  deleteDoc, 
  doc, 
  // Exporting updateDoc so it can be used in components like AdminPanel
  updateDoc,
  serverTimestamp, 
  query, 
  orderBy, 
  where, 
  setDoc,
  onSnapshot,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
};
