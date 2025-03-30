
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";




const firebaseConfig = {
    apiKey: "AIzaSyDb51lim47AjGx7-zVeSfKdJrzwtJu8R3Q",
    authDomain: "finni-96157.firebaseapp.com",
    projectId: "finni-96157",
    storageBucket: "finni-96157.appspot.com",
    appId: "1:819128500640:web:9517812770da3a0701e4c5",
    measurementId: "G-54SP23XTM5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth }; 
