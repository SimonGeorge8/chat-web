import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Web app;s Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAr4HiQyMXvriQxXb4m-YJeO0HL6ieokt4",
  authDomain: "chat-web-da092.firebaseapp.com",
  projectId: "chat-web-da092",
  storageBucket: "chat-web-da092.appspot.com",
  messagingSenderId: "746798737701",
  appId: "1:746798737701:web:b408dad9f5fc1ddc3592cc",
  measurementId: "G-BQESXL6RFP"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export{ app, auth };
