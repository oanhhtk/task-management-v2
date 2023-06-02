// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const currentURL = window.location.href; // returns the absolute URL of a page
const firebaseConfig = {
  apiKey: "AIzaSyCxmaXD1yfUUHv2lK3vlYYj00FxGlTyeVc",
  authDomain: "task-management-7de21.firebaseapp.com",
  projectId: "task-management-7de21",
  storageBucket: "task-management-7de21.appspot.com",
  messagingSenderId: "517821099580",
  appId: "1:517821099580:web:4e9877f0877e0bffc39d39",
  measurementId: "G-DT00041TE2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
