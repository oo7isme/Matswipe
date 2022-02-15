var firebaseConfig = {
    apiKey: "AIzaSyB30z4Haw-Nx2wRGoT88Iq7uVCpdZ0GGj4",
    authDomain: "matswipe-30b10.firebaseapp.com",
    projectId: "matswipe-30b10",
    storageBucket: "matswipe-30b10.appspot.com",
    messagingSenderId: "793866100966",
    appId: "1:793866100966:web:33a6372fbd36de69649b27"
};

//Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()

function signOut() {
    let signOutButton = document.getElementById("signout")
    signOutButton.addEventListener("click", (e) => {
    //Prevent Default Form Submission Behavior
    e.preventDefault()
    console.log("clicked")
    
    auth.signOut()
    alert("Signed Out")
    window.location = "../index.html";
})
}


//Signup Function
let signUpButton = document.getElementById('signup')
signUpButton.addEventListener("click", (e) => {
    //Prevent Default Form Submission Behavior
    e.preventDefault()
    console.log("clicked")

    var email = document.getElementById("inputEmail")
    var password = document.getElementById("inputPassword")
        
    auth.createUserWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
    location.reload();
    // Signed in 
    var user = userCredential.user;
    console.log("user",user.email)
    })
    .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("error code", errorCode)
    console.log("error Message", errorMessage)
    });
})








let signInButton = document.getElementById('signin')
signInButton.addEventListener("click", (e) => {
//Prevent Default Form Submission Behavior
e.preventDefault()
console.log("clicked")

var email = document.getElementById("inputEmail")
var password = document.getElementById("inputPassword")

auth.signInWithEmailAndPassword(email.value, password.value) 
.then((userCredential) => {
    // location.reload();
    // Signed in 
    var user = userCredential.user;
    console.log("user",user.email)
    window.location = "PAGES/home.html";
    })
    .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // alert("error code", errorCode)
    alert( errorMessage)
    });
})



//This method gets invoked in the UI when there are changes in the authentication state:
// 1). Right after the listener has been registered
// 2). When a user is signed in
// 3). When the current user is signed out
// 4). When the current user changes

//Lifecycle hooks
auth.onAuthStateChanged(function(user) {
  if (user) {

    var email = user.email
  
    var users = document.getElementById("user")
    var text = document.createTextNode(email);

    users.appendChild(text);

    console.log(users)

    window.location = "PAGES/home.html";
  } else {
    //no user signed in
  }
})