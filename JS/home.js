import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
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

    } else {
        if (window.location != 'index.html') {
            window.location = "../index.html";
        }
    }
})


// GENERAL USE ELEMENTS
var matswipeContainer = document.querySelector('.matswipe');
var currentCard = document.getElementById('current_card')
var nope = document.getElementById('nope');
var love = document.getElementById('love');
var fav = document.getElementById('fav');



// EVENT LISTENERS
fav.addEventListener('click', () => {
    window.open('fav.html', "_self")
});
document.getElementById('filter').addEventListener('click', () => {
    popup.style.display = "flex";
});

document.querySelector('#close').addEventListener('click', () => {
    document.getElementById('popup').style.display = 'none';
});



//  FUNCTIONS
// Increment index
var index = 0;

function incrementIndex() {
    ++index;
    return index;
}



// MAIN SWIPE CODE
var hammertime = new Hammer(currentCard);

hammertime.on('pan', function(event) {
    currentCard.classList.add('moving');
});

hammertime.on('pan', function(event) {
    event.target.style.transition = '';
    if (event.deltaX === 0) return;
    if (event.center.x === 0 && event.center.y === 0) return;

    matswipeContainer.classList.toggle('matswipe_love', event.deltaX > 0);
    matswipeContainer.classList.toggle('matswipe_nope', event.deltaX < 0);

    var xMulti = event.deltaX * 0.03;
    var yMulti = event.deltaY / 80;
    var rotate = xMulti * yMulti;

    event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
});

hammertime.on('panend', function(event) {
    event.target.style.transition = 'transition: all 0.3s ease-in-out';
    currentCard.classList.remove('moving');
    matswipeContainer.classList.remove('matswipe_love');
    matswipeContainer.classList.remove('matswipe_nope');

    var moveOutWidth = document.body.clientWidth;
    var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

    if (keep) {
        event.target.style.transform = '';
    } else {
        var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
        var toX = event.deltaX > 0 ? endX : -endX;
        var endY = Math.abs(event.velocityY) * moveOutWidth;
        var toY = event.deltaY > 0 ? endY : -endY;
        var xMulti = event.deltaX * 0.03;
        var yMulti = event.deltaY / 80;
        var rotate = xMulti * yMulti;

        event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
        event.target.style.transition = '';
        if (event.deltaX > 0) {
            liked(incrementIndex())
        } else if (event.deltaX < 0) {
            disliked(incrementIndex())
        }
    }
});



// LIKE DISLIKE BUTTONS
function createButtonListener(love) {
    return function(event) {
        document.getElementById("love").disabled = true;
        document.getElementById("nope").disabled = true;
        setTimeout(function() { document.getElementById("love").disabled = false; }, 800);
        setTimeout(function() { document.getElementById("nope").disabled = false; }, 800);

        var moveOutWidth = document.body.clientWidth * 1.5;
        var card = document.getElementById('current_card')

        if (love) {
            card.style.transition = 'all 0.3s ease-in-out';
            card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
            btnliked(incrementIndex())
        } else {
            card.style.transition = 'all 0.3s ease-in-out';
            card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
            btndisliked(incrementIndex())
        }

        event.preventDefault();
    };
}
var nopeListener = createButtonListener(false);
var loveListener = createButtonListener(true);
nope.addEventListener('click', nopeListener);
love.addEventListener('click', loveListener);



// TAGS FILTER SYSTEM
var filter = [];
var tags = document.querySelectorAll('.tag')
tags.forEach(item => {
    item.addEventListener('click', event => {
        if (item.getAttribute('clicked') == null) {
            item.setAttribute('clicked', 'false')
        }
        if (item.getAttribute('clicked') == 'false') {
            filter.push(item.textContent.toLowerCase());
            console.log(filter)
            item.setAttribute('clicked', 'true')
            item.style.background = "#4CAF50";
            item.style.color = "white";
            return;
        }
        if (item.getAttribute('clicked') == 'true') {
            filter.splice(filter.indexOf(item.textContent.toLowerCase()), 1)
            console.log(filter)
            item.style.background = "#eee";
            item.style.color = "#999";
            item.setAttribute('clicked', 'false')
        }
    })
})