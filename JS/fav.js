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
document.getElementById('likedlistnull').style.display = 'none'
document.getElementById('closeiframe').style.display = 'none'

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

if (likedList != null) {
    Object.entries(likedList).forEach((liked) => {
        var matrett = document.createElement('div')
        matrett.className = 'matrett'
        matrett.id = liked[1].title.toLowerCase().replace(/\s/g, '');
        document.getElementById("listofmatretterlongname").appendChild(matrett)

        var img = document.createElement('img')
        img.src = liked[1].pic
        img.className = 'img'
        document.getElementById(matrett.id).appendChild(img)

        var matrettunder = document.createElement('div')
        matrettunder.className = 'matrettunder'
        matrettunder.id = 'matrettunder' + matrett.id
        document.getElementById(matrett.id).appendChild(matrettunder)

        var title = document.createElement('h3')
        title.innerHTML = liked[1].title
        title.className = 'title'
        title.id = 'title' + liked[1].title.toLowerCase().replace(/\s/g, '');
        document.getElementById(matrettunder.id).appendChild(title)

        var tagsdiv = document.createElement('div')
        tagsdiv.className = 'tagsdiv'
        tagsdiv.id = 'tagsdiv' + matrett.id
        document.getElementById(matrettunder.id).appendChild(tagsdiv)

        var tag1 = document.createElement('div')
        tag1.className = 'tag1'
        tag1.textContent = liked[1].tags[1]
        document.getElementById(tagsdiv.id).appendChild(tag1)

        var tag2 = document.createElement('div')
        tag2.className = 'tag2'
        tag2.textContent = liked[1].tags[2]
        document.getElementById(tagsdiv.id).appendChild(tag2)

        var tag3 = document.createElement('div')
        tag3.className = 'tag3'
        tag3.textContent = liked[1].tags[3]
        document.getElementById(tagsdiv.id).appendChild(tag3)

        var iframe = document.createElement('iframe')
        iframe.className = 'iframe'
        iframe.id = 'iframe' + liked[1].id
        iframe.src = liked[1].url
        document.getElementById('matswipe').appendChild(iframe)
        iframe.style.display = 'none'


        document.getElementById(matrett.id).addEventListener('click', () => {
            iframe.style.display = 'block'
            document.getElementById('listofmatretterlongname').style.display = 'none'
            document.getElementById('searchbox').style.display = 'none'
            document.getElementById('closeiframe').style.display = 'inline-block'
            document.getElementById('back').style.display = 'none'
        })

        document.getElementById('closeiframe').addEventListener('click', () => {
            document.getElementById('iframe' + liked[1].id).style.display = 'none'
            document.getElementById('listofmatretterlongname').style.display = 'flex'
            document.getElementById('searchbox').style.display = 'block'
            document.getElementById('closeiframe').style.display = 'none'
            document.getElementById('back').style.display = 'inline-block'
        })

    })
} else if (likedList == null) {
    document.getElementById('likedlistnull').style.display = 'block'
}

var matretterTitle = [];
Object.entries(listofmatretterlongname.children).forEach(element => {
    element = element[1]
    var title = document.getElementById('title' + element.id).textContent.toLowerCase().replace(/\s/g, '');
    matretterTitle.push(title)
});
document.getElementById('input-search').addEventListener('input', (e) => {
    const search = e.target.value.toLowerCase().replace(/\s/g, '');
    matretterTitle.forEach(title => {
        if (!title.includes(search)) {
            document.getElementById(title).style.display = 'none'
        } else {
            document.getElementById(title).style.display = 'flex'
        }
    })

})







// KEEP THIS AT THE BOTTOM ITS A LOADER
document.getElementById("matswipe").style.display = "flex";
document.getElementById("matswipe2").style.display = "block";
document.getElementById("loader").style.display = "none";
document.getElementById("loader_text").style.display = "none";