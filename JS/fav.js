document.getElementById("matswipe").style.display = "none";
document.getElementById("matswipe2").style.display = "none";
document.getElementById("loader").style.display = "block";
document.getElementById("loader_text").style.display = "block";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
import { getDatabase, ref, set, onValue, child, get, push, update } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js';
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

document.getElementById("back").addEventListener("click", () => {
    window.history.back()
})

let uid = '';
onAuthStateChanged(auth, function(user) {
    if (user) {
        uid = user.uid
        console.log(uid);
    } else {
        if (window.location != 'index.html') {
            window.location = "../index.html";
        }
    }
})

await new Promise(r => setTimeout(r, 1000));

var likedList;
get(child(ref(getDatabase()), "users/" + uid + "/liked")).then((snapshot) => {
    if (snapshot.exists()) {
        likedList = snapshot.val();
    } else {

    }
}).catch((error) => {
    console.error(error);
});
await new Promise(r => setTimeout(r, 500));

console.log(likedList);

likedList.forEach((liked) => {
    var matrett = document.createElement('div')
    matrett.className = 'matrett'
    matrett.id = liked.id
    document.getElementById("listofmatretterlongname").appendChild(matrett)

    var img = document.createElement('img')
    img.src = liked.pic
    img.className = 'img'
    document.getElementById(matrett.id).appendChild(img)

    var matrettunder = document.createElement('div')
    matrettunder.className = 'matrettunder'
    matrettunder.id = 'matrettunder' + matrett.id
    document.getElementById(matrett.id).appendChild(matrettunder)

    var title = document.createElement('h3')
    title.innerHTML = liked.title
    title.className = 'title'
    document.getElementById(matrettunder.id).appendChild(title)

    var tagsdiv = document.createElement('div')
    tagsdiv.className = 'tagsdiv'
    tagsdiv.id = 'tagsdiv' + matrett.id
    document.getElementById(matrettunder.id).appendChild(tagsdiv)

    var tag1 = document.createElement('div')
    tag1.className = 'tag1'
    tag1.textContent = liked.tags[1]
    document.getElementById(tagsdiv.id).appendChild(tag1)

    var tag2 = document.createElement('div')
    tag2.className = 'tag2'
    tag2.textContent = liked.tags[2]
    document.getElementById(tagsdiv.id).appendChild(tag2)

    var tag3 = document.createElement('div')
    tag3.className = 'tag3'
    tag3.textContent = liked.tags[3]
    document.getElementById(tagsdiv.id).appendChild(tag3)

})





// KEEP THIS AT THE BOTTOM ITS A LOADER
document.getElementById("matswipe").style.display = "flex";
document.getElementById("matswipe2").style.display = "block";
document.getElementById("loader").style.display = "none";
document.getElementById("loader_text").style.display = "none";