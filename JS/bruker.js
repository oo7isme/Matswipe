import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getAuth, onAuthStateChanged, sendPasswordResetEmail, signOut } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js';
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
onAuthStateChanged(auth, function(user) {
    if (user) {
        var email = user.email;
        document.getElementById("epost").innerHTML = email;
    } else {
        if (window.location != 'index.html') {
            window.location = "../index.html";
        }
    }
})

let signOutButton = document.getElementById("signout")
signOutButton.addEventListener("click", (e) => {
    //Prevent Default Form Submission Behavior
    e.preventDefault()
    auth.signOut().then(() => {
        alert("Signed Out")
    })

})

const popup = document.getElementById("popup")
    //const close = document.querySelector = "#close";

let resetButton = document.getElementById('reset')
resetButton.addEventListener("click", (e) => {
    e.preventDefault()
    var email = document.getElementById("epost").innerHTML;
    sendPasswordResetEmail(email)
        .then(() => {
            console.log("Password reset email sent!")
            popup.style.display = "flex";


        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
})