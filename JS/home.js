import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
import { getDatabase, ref, set, onValue } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js';
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
var filter = ["default"];
var tags = document.querySelectorAll('.tag')
tags.forEach(item => {
    item.addEventListener('click', event => {
        if (item.getAttribute('clicked') == null) {
            item.setAttribute('clicked', 'false')
        }
        if (item.getAttribute('clicked') == 'false') {
            filter.push(item.textContent.toLowerCase());
            if (filter.length == 2 && filter.includes("default")) {
                filter.splice(filter.indexOf("default"), 1)
                console.log("spliced")
            }
            console.log(filter)
            item.setAttribute('clicked', 'true')
            item.style.background = "#4CAF50";
            item.style.color = "white";
            return;
        }
        if (item.getAttribute('clicked') == 'true') {
            filter.splice(filter.indexOf(item.textContent.toLowerCase()), 1)
            if (filter.length == 0) {
                filter.push("default");
                console.log("put")
            }
            console.log(filter)
            item.style.background = "#eee";
            item.style.color = "#999";
            item.setAttribute('clicked', 'false')
        }
    })
})


// Matretter
let matretter = {
    "matretter": [
        { "id": "0", "title": "Taco", "desc": "Taco som vi kjenner den! Oppskrift på klassisk norsk taco – fersk og hjemmelaget. Taco er en tradisjonell meksikansk rett som nordmenn har tatt til sitt hjerte og gjort litt sin egen. Fredagen er ofte ikke den samme uten fredagstaco.", "pic": "https://previews.123rf.com/images/gdolgikh/gdolgikh1703/gdolgikh170300221/74432760-%E7%89%9B%E8%82%89%E3%81%AE%E3%82%BF%E3%82%B3%E3%82%B9.jpg", "tags": ["default", "kjøttdeig"] },
        { "id": "1", "title": "Pasta Bolognese", "desc": "Pasta bolognese er nok en av verdens mest populære retter, og den skal inneholde storfekjøtt i små biter, pancetta som er en type bacon, løk, gulrøtter, selleri, tomat, kjøttkraft, vin og eventuelt melk. ", "pic": "https://coop.no/globalassets/coop-extra/mat--trender/rask-pasta-bolognese-1200-720.gif?preset=Large", "tags": ["default", "tomat"] },
        { "id": "2", "title": "Bruschetta", "desc": "Bruschetta er en matrett fra Italia. Den består av grillede eller stekte biter av brød eller baguett med hvitløk og olivenolje påsmurt og med saltdryss.", "pic": "https://pagen.no/globalassets/recept/bruchetta.jpg?w=734&h=462&mode=crop&resized=true", "tags": ["default", "brød"] },
        { "id": "3", "title": "Tomatsuppe", "desc": "Tomatsuppe er en suppe laget av tomater. Den serveres både varm og kald, og er ofte brukt som ingrediens i mer avanserte retter. Det er også vanlig å tilsette makaroni eller egg.", "pic": "https://husglede.no/wp-content/uploads/2020/08/TOmatsuppe-hovedbilde.jpg", "tags": ["default", "egg"] },
        { "id": "4", "title": "Salat", "desc": "Salat er en kald, eller lun matrett som inneholder en blanding oppskårne eller strimlete ingredienser. Ingrediensene er ofte rå, og kan omfatte bladgrønnsaker som salat, spinat eller lignende vekster, ulike grønnsaker, frukt, nøtter, kjøtt og sjømat.", "pic": "https://www.aperitif.no/storage/image/core_files/2015/3/2/de4912925c946321bb7d45d2431833fc/jpg/aperitif/article_details_medium/original.jpg", "tags": ["default", "kjøttdeig", "brød"] }
    ]
};
const obj = JSON.parse(JSON.stringify(matretter));

var matretterListe = obj.matretter.filter(matrett => {
    console.log("filter filtret")
    return matrett.tags.some(tag => filter.includes(tag))
})



document.getElementById('filter').addEventListener('click', () => {
    popup.style.display = "flex";
});
document.querySelector('#close').addEventListener('click', () => {
    document.getElementById('popup').style.display = 'none';

    const user = auth.currentUser;
    const writeFilterData = async() => {
        try {
            await set(ref(db, 'filter/' + user.uid), filter);
        } catch (ex) {
            console.error(`Error while setting data: ${ex.message}`);
        }
    };
    writeFilterData();
    onValue(ref(db, 'filter/' + user.uid), (data) => {
        const filter = data.val();
        console.log(filter)
    });

    nextMatrett(0)
});

obj.matretter.forEach(matrett => {
    const writeFoodData = async() => {
        try {
            await set(ref(db, 'matretter/' + matrett.id), matrett);
        } catch (ex) {
            console.error(`Error while setting data: ${ex.message}`);
        }
    };
    writeFoodData();
})







function currentCardInit(index) {
    var index_current = index;
    var current_matrett = matretterListe[index_current]

    var current_pic_value = current_matrett.pic;
    var current_title_value = current_matrett.title;
    var current_desc_value = current_matrett.desc;


    var current_pic = document.getElementById("current_pic")
    var current_title = document.getElementById("current_title")
    var current_desc = document.getElementById("current_desc")

    current_pic.src = current_pic_value;
    current_title.innerHTML = current_title_value;
    current_desc.innerHTML = current_desc_value;

}

function nextCardInit(index) {
    var index_next = index + 1;
    var next_matrett = matretterListe[index_next]
    console.log(matretterListe)
    var next_pic_value = next_matrett.pic;
    var next_title_value = next_matrett.title;
    var next_desc_value = next_matrett.desc;


    var next_pic = document.getElementById("next_pic")
    var next_title = document.getElementById("next_title")
    var next_desc = document.getElementById("next_desc")

    next_pic.src = next_pic_value;
    next_title.innerHTML = next_title_value;
    next_desc.innerHTML = next_desc_value;

    var next_pic = document.getElementById("next_pic")
    var next_title = document.getElementById("next_title")
    var next_desc = document.getElementById("next_desc")
}

function nextMatrett(index) {
    if (index < matretterListe.length - 1) {
        currentCardInit(index)
        nextCardInit(index)
    } else if (index < matretterListe.length) {
        currentCardInit(index)
        document.getElementById('next_card').style.display = 'none'
    }
    if (index == matretterListe.length) {
        document.getElementById('current_card').style.display = 'none'
        alert("Ingen fler matretter ble funnet med dine filtre!")
        location.reload()
    }

}
nextMatrett(0)

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function liked(index) {
    var card = document.getElementById('current_card');
    await delay(100)
    card.style.transition = 'none';
    card.style.opacity = '0';
    card.style.transform = 'none';
    var id = document.getElementById('current_title').textContent
    console.log("Liked " + id)
    nextMatrett(index)
    card.style.opacity = '1';


}

async function disliked(index) {
    var card = document.getElementById('current_card');
    await delay(100)
    card.style.transition = 'none';
    card.style.opacity = '0';
    card.style.transform = 'none';
    var id = document.getElementById('current_title').textContent
    console.log("Disliked " + id)
    nextMatrett(index)
    card.style.opacity = '1';
}

async function btnliked(index) {
    var card = document.getElementById('current_card');
    id = document.getElementById('current_title').textContent
    console.log("Liked " + id)
    await delay(300)
    card.style.transition = 'none';
    card.style.opacity = '0';
    card.style.transform = 'none';
    await delay(300)
    nextMatrett(index)
    card.style.opacity = '1';
    await delay(100)
    card.style.transition = 'none';
}

async function btndisliked(index) {
    var card = document.getElementById('current_card');
    id = document.getElementById('current_title').textContent
    console.log("Disliked " + id)
    await delay(300)
    card.style.transition = 'none';
    card.style.opacity = '0';
    card.style.transform = 'none';
    await delay(300)
    nextMatrett(index)
    card.style.opacity = '1';
    await delay(100)
    card.style.transition = 'none';
}