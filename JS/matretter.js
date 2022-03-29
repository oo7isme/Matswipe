import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
import { getDatabase, ref, set, onValue, get, child } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js';
var firebaseConfig = {
    apiKey: "AIzaSyB30z4Haw-Nx2wRGoT88Iq7uVCpdZ0GGj4",
    authDomain: "matswipe-30b10.firebaseapp.com",
    projectId: "matswipe-30b10",
    databaseURL: "https://matswipe-30b10-default-rtdb.europe-west1.firebasedatabase.app/",
    storageBucket: "matswipe-30b10.appspot.com",
    messagingSenderId: "793866100966",
    appId: "1:793866100966:web:33a6372fbd36de69649b27"
};
let app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();