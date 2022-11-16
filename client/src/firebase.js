import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBZ86ALvqpRLbqK58rPbeDUAdLZHjS5dEI",
    authDomain: "ssd-dcab8.firebaseapp.com",
    projectId: "ssd-dcab8",
    storageBucket: "ssd-dcab8.appspot.com",
    messagingSenderId: "194522143104",
    appId: "1:194522143104:web:737fb72e2c14bcbd734965"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, process.env.REACT_APP_FIREBASE_STORAGE_URL);

export default storage;