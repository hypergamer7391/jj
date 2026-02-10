
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMCarlYVHPRskj5z89p6uP3opZyn3u9JU",
  authDomain: "j-j-53dc0.firebaseapp.com",
  projectId: "j-j-53dc0",
  storageBucket: "j-j-53dc0.firebasestorage.app",
  messagingSenderId: "606538394027",
  appId: "1:606538394027:web:83095dca539bf89b2c0aee",
  measurementId: "G-63CFYLQ10J"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export { collection, addDoc, getDocs, deleteDoc, doc };