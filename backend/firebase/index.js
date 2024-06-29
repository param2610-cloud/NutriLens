// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQxzZZjridV2dSvhYFCvgdPuClJpJ0D1k",
  authDomain: "nutrilens-10137.firebaseapp.com",
  projectId: "nutrilens-10137",
  storageBucket: "nutrilens-10137.appspot.com",
  messagingSenderId: "469717836043",
  appId: "1:469717836043:web:ac6f2234dde132cbbec20e",
  measurementId: "G-H3111PGSMW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
// const analytics = getAnalytics(app);