// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { firebaseConfigVars } from "../config/firebaseRoutes";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: firebaseConfigVars.apiKey,
  authDomain: firebaseConfigVars.authDomain,
  projectId: firebaseConfigVars.projectId,
  storageBucket: firebaseConfigVars.storageBucket,
  messagingSenderId: firebaseConfigVars.messagingSenderId,
  appId: firebaseConfigVars.appId,
  measurementId: firebaseConfigVars.measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };
