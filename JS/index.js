import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js';
var firebaseConfig = {
    apiKey: "AIzaSyB30z4Haw-Nx2wRGoT88Iq7uVCpdZ0GGj4",
    authDomain: "matswipe-30b10.firebaseapp.com",
    projectId: "matswipe-30b10",
    storageBucket: "matswipe-30b10.appspot.com",
    messagingSenderId: "793866100966",
    appId: "1:793866100966:web:33a6372fbd36de69649b27"
};
let app = initializeApp(firebaseConfig);
const auth = getAuth(app);


onAuthStateChanged(auth, function(user) {
    if (user) {
        var uid = user.uid;
        window.location = "PAGES/home.html";
    } else {
        //no user signed in
    }
})


// SIGN UP FUNCTION// SIGN UP FUNCTION// SIGN UP FUNCTION// SIGN UP FUNCTION// SIGN UP FUNCTION// SIGN UP FUNCTION
let signUpButton = document.getElementById('signup')
signUpButton.addEventListener("click", (e) => {
    //Prevent Default Form Submission Behavior
    e.preventDefault()

    var email = document.getElementById("inputEmail")
    var password = document.getElementById("inputPassword")

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            location.reload();
            // Signed in 
            var user = userCredential.user;

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("error code", errorCode)
            console.log("error Message", errorMessage)
        });
})


// SIGN IN FUNCTION// SIGN IN FUNCTION// SIGN IN FUNCTION// SIGN IN FUNCTION
let signInButton = document.getElementById('signin')
signInButton.addEventListener("click", (e) => {
    //Prevent Default Form Submission Behavior
    e.preventDefault()

    var email = document.getElementById("inputEmail1")
    var password = document.getElementById("inputPassword1")
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // location.reload();
            // Signed in 
            var user = userCredential.user;
            var database = firebase.database();

            window.location = "PAGES/home.html";
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // alert("error code", errorCode)
            alert(errorMessage)
        });
})

$('.message a').click(function() {
    $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
});