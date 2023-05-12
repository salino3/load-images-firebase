import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';


const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_APIKEY,
  authDomain: import.meta.env.VITE_APP_APIKEY2,
  projectId: import.meta.env.VITE_APP_APIKEY3,
  storageBucket: import.meta.env.VITE_APP_APIKEY4,
  messagingSenderId: import.meta.env.VITE_APP_APIKEY5,
  appId: import.meta.env.VITE_APP_APIKEY6,
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);