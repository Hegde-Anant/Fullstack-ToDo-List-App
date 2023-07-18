// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiFe3NRTRsiv5gncgpcN1kyr6v6bxYn9w",
  authDomain: "todo-app-371e1.firebaseapp.com",
  projectId: "todo-app-371e1",
  storageBucket: "todo-app-371e1.appspot.com",
  messagingSenderId: "59642199323",
  appId: "1:59642199323:web:d9b70f80dc1e19d3e8e7be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)