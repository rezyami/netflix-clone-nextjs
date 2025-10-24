// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhIumGwT6DkPU2dzHYVic9knVNII3hEzY",
  authDomain: "netflixclone-d3451.firebaseapp.com",
  projectId: "netflixclone-d3451",
  storageBucket: "netflixclone-d3451.firebasestorage.app",
  messagingSenderId: "198451577297",
  appId: "1:198451577297:web:33a71a8e4272bf1fd920f0",
  measurementId: "G-9MPPGYEPXM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };