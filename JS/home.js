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


var matswipeContainer = document.querySelector('.matswipe');
var allCards = document.querySelectorAll('.matswipe--card');
var nope = document.getElementById('nope');
var love = document.getElementById('love');
var fav = document.getElementById('fav');


function initCards(card, index) {

    var newCards = document.querySelectorAll('.matswipe--card');
    newCards.forEach(function(card, index) {
        card.style.zIndex = allCards.length - index;
        card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 0.00000001 * index + 'px)';
    });

    matswipeContainer.classList.add('loaded');
}

initCards();

allCards.forEach(function(el) {
    var hammertime = new Hammer(el);

    hammertime.on('pan', function(event) {
        el.classList.add('moving');
    });

    hammertime.on('pan', function(event) {
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
        el.classList.remove('moving');
        matswipeContainer.classList.remove('matswipe_love');
        matswipeContainer.classList.remove('matswipe_nope');

        var moveOutWidth = document.body.clientWidth;
        var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

        event.target.classList.toggle('removed', !keep);

        if (keep) {
            event.target.style.transform = '';
        } else {
            if (event.deltaX > 0) {
                console.log("like")
            } else if (event.deltaX < 0) {
                console.log("dislike")
            }
            var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
            var toX = event.deltaX > 0 ? endX : -endX;
            var endY = Math.abs(event.velocityY) * moveOutWidth;
            var toY = event.deltaY > 0 ? endY : -endY;
            var xMulti = event.deltaX * 0.03;
            var yMulti = event.deltaY / 80;
            var rotate = xMulti * yMulti;

            event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
            initCards();
        }
    });
});

function favListener() {
    window.open('fav.html', "_self")
}

fav.addEventListener('click', favListener);


function createButtonListener(love) {
    return function(event) {
        var cards = document.querySelectorAll('.matswipe--card');
        var moveOutWidth = document.body.clientWidth * 1.5;

        if (!cards.length) return false;

        var card = cards[0];

        card.classList.add('removed');

        if (love) {
            console.log("liked")
            card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
        } else {
            console.log("dislike")
            card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
        }

        initCards();

        event.preventDefault();
    };
}

var nopeListener = createButtonListener(false);
var loveListener = createButtonListener(true);

nope.addEventListener('click', nopeListener);
love.addEventListener('click', loveListener);