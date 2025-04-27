import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, GoogleAuthProvider } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDb51lim47AjGx7-zVeSfKdJrzwtJu8R3Q",
    authDomain: "finni-96157.firebaseapp.com",
    projectId: "finni-96157",
    storageBucket: "finni-96157.appspot.com",
    appId: "1:819128500640:web:9517812770da3a0701e4c5",
    measurementId: "G-54SP23XTM5"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export { app, firestore, auth, GoogleAuthProvider };