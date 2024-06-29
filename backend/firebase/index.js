// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase-admin/app";
// // import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.EXPO_API_KEY,
//   authDomain: process.env.EXPO_AUTH_DOMAIN,
//   projectId: process.env.EXPO_PROJECT_ID,
//   storageBucket: process.env.EXPO_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.EXPO_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.EXPO_FIREBASE_APP_ID,
//   measurementId: process.env.EXPO_FIREBASE_MEASUREMENT_ID,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export default app;
// // const analytics = getAnalytics(app);

import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} from "firebase-admin/firestore";

import serviceAccount from "./service_key.json" assert { type: "json" };

export default initializeApp({
  credential: cert(serviceAccount),
});
