document.getElementById("matswipemaincon").style.display = "none";
document.getElementById("loader").style.display = "block";
document.getElementById("loader_text").style.display = "block";
document.getElementById("show_nomorecards").style.display = "none";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
import { getDatabase, ref, set, onValue, child, get, push, update, remove } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js';
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

let uid = '';
onAuthStateChanged(auth, function (user) {
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

hammertime.on('pan', function (event) {
    currentCard.classList.add('moving');
});

hammertime.on('pan', function (event) {
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

hammertime.on('panend', function (event) {
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
    return function (event) {
        document.getElementById("love").disabled = true;
        document.getElementById("nope").disabled = true;
        setTimeout(function () { document.getElementById("love").disabled = false; }, 800);
        setTimeout(function () { document.getElementById("nope").disabled = false; }, 800);

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
const dbRef = ref(getDatabase());

var filter = get(child(dbRef, "filter/" + uid)).then((snapshot) => {
    if (snapshot.exists()) {
        filter = snapshot.val();
        console.log("Extracted data: ")
        console.log(filter)
    } else {
        const writeFilterInit = async () => {
            try {
                await set(ref(db, 'filter/' + uid), ["default"]);
                location.reload()
            } catch (ex) {
                console.error(`Error while setting data: ${ex.message}`);
            }
        };
        writeFilterInit();
    }
}).catch((error) => {
    console.error(error);
});
await new Promise(r => setTimeout(r, 1000));
var tags = document.querySelectorAll('.tag')
filter.forEach(filter => {
    tags.forEach(item => {
        if (filter == item.textContent.toLowerCase()) {
            item.setAttribute('clicked', 'true')
            item.style.background = "#4CAF50";
            item.style.color = "white";
        }
    })
})
tags.forEach(item => {
    item.addEventListener('click', event => {
        if (item.getAttribute('clicked') == null) {
            item.setAttribute('clicked', 'false')
        }
        if (item.getAttribute('clicked') == 'false') {
            filter.push(item.textContent.toLowerCase());
            if (filter.length == 2 && filter.includes("default")) {
                filter.splice(filter.indexOf("default"), 1)
            }
            item.setAttribute('clicked', 'true')
            item.style.background = "#4CAF50";
            item.style.color = "white";
            return;
        }
        if (item.getAttribute('clicked') == 'true') {
            filter.splice(filter.indexOf(item.textContent.toLowerCase()), 1)
            if (filter.length == 0) {
                filter.push("default");
            }
            item.style.background = "#eee";
            item.style.color = "#999";
            item.setAttribute('clicked', 'false')
        }
    })
})


// Matretter
let matretter = {
    "matretter": [
        { "id": "0", "title": "Taco", "desc": "Taco som vi kjenner den! Oppskrift på klassisk norsk taco – fersk og hjemmelaget. Taco er en tradisjonell meksikansk rett som nordmenn har tatt til sitt hjerte og gjort litt sin egen. Fredagen er ofte ikke den samme uten fredagstaco.", "pic": "https://previews.123rf.com/images/gdolgikh/gdolgikh1703/gdolgikh170300221/74432760-%E7%89%9B%E8%82%89%E3%81%AE%E3%82%BF%E3%82%B3%E3%82%B9.jpg", "url": "https://www.matprat.no/oppskrifter/familien/taco/", "tags": ["default", "kjøttdeig", "tomat", "løk", "ost", "agurk", "mais"] },
        { "id": "1", "title": "Pasta Bolognese", "desc": "Pasta bolognese er nok en av verdens mest populære retter, og den skal inneholde storfekjøtt i små biter, pancetta som er en type bacon, løk, gulrøtter, selleri, tomat, kjøttkraft, vin og eventuelt melk. ", "pic": "https://coop.no/globalassets/coop-extra/mat--trender/rask-pasta-bolognese-1200-720.gif?preset=Large", "url": "https://www.matprat.no/oppskrifter/gjester/pasta-bolognese/?gclid=Cj0KCQjwpcOTBhCZARIsAEAYLuWbjBqlc1_Da7QGiWFD_rEZVa1-TkZucW5q_a1-hJuAg-OtxBxH2VgaAjbgEALw_wcB&gclsrc=aw.ds", "tags": ["default", "tomat", "kjøttdeig", "løk", "hvitløk", "stangselleri"] },
        { "id": "2", "title": "Bruschetta", "desc": "Bruschetta er en matrett fra Italia. Den består av grillede eller stekte biter av brød eller baguett med hvitløk og olivenolje påsmurt og med saltdryss.", "pic": "https://pagen.no/globalassets/recept/bruchetta.jpg?w=734&h=462&mode=crop&resized=true", "url": "https://www.matprat.no/oppskrifter/gjester/bruschetta/?gclid=Cj0KCQjwpcOTBhCZARIsAEAYLuWMJXawbSY7mDcPJrrP820ye4iyps6FAQMML2xnDP0SNuwZOMJPHQ8aAiUxEALw_wcB&gclsrc=aw.ds", "tags": ["default", "brød", "tomat", "basilikum", "hvitløk"] },
        { "id": "3", "title": "Tomatsuppe med kokt egg", "desc": "Tomatsuppe er en suppe laget av tomater. Den serveres både varm og kald, og er ofte brukt som ingrediens i mer avanserte retter. Det er også vanlig å tilsette makaroni eller egg.", "pic": "https://husglede.no/wp-content/uploads/2020/08/TOmatsuppe-hovedbilde.jpg", "url": "https://www.matprat.no/oppskrifter/familien/tomatsuppe-med-kokt-egg/", "tags": ["default", "egg", "løk", "hvitløk", "tomat"] },
        { "id": "4", "title": "Salat", "desc": "Salat er en kald, eller lun matrett som inneholder en blanding oppskårne eller strimlete ingredienser. Ingrediensene er ofte rå, og kan omfatte bladgrønnsaker som salat, spinat eller lignende vekster, ulike grønnsaker, frukt, nøtter, kjøtt og sjømat.", "pic": "https://www.aperitif.no/storage/image/core_files/2015/3/2/de4912925c946321bb7d45d2431833fc/jpg/aperitif/article_details_medium/original.jpg", "url": "https://www.matprat.no/oppskrifter/gjester/casarsalat/", "tags": ["default", "kylling", "brød", "tomat"] },
        { "id": "5", "title": "Chili con carne", "desc": "Varmende rett med mange gode smaker. Chili con carne er nydelig hverdagsmat som metter og er enkelt å lage. Både kjøttdeig og karbonadedeig kan brukes, og du kan justere mengden chili etter smak. Server gjerne med tortillachips, ris og koriander.", "pic": "https://www.rema.no/remacommerceapi/v2/rema/media/convert/remaProductCatalog/Online/REC-202216?w=1280&q=75", "url": "https://www.matprat.no/oppskrifter/rask/chili-con-carne/?gclid=Cj0KCQjwpcOTBhCZARIsAEAYLuV6mI8wbvFqunV7M6WwfYnJR0kopBc7ptPopCPPKrdkElBXk8cSjFMaAvzwEALw_wcB&gclsrc=aw.ds", "tags": ["default", "kjøttdeig", "løk", "hvitløk", "chili", "tomat", "paprika"] },
        { "id": "6", "title": "Burritos med kyllingkjøttdeig", "desc": "Burrito er en tradisjonell matrett fra Mexico som består av en tortilla som er brettet rundt et fyll. I denne oppskriften har vi valgt å bruke kjøttdeig, men du kan også bruke karbonadedeig eller kyllingkjøttdeig for en sunnere variant.", "pic": "https://images.matprat.no/yt7qajmf28-jumbotron/large", "url": "https://www.matprat.no/oppskrifter/kos/burritos-med-kyllingkjottdeig/", "tags": ["default", "kylling", "løk", "spinat", "tortilla", "tacosaus"] },
        { "id": "7", "title": "Kjøttkaker med kålstuing", "desc": "Kjøttkaker til middag er god tradisjonsmat. Her servert med kokte poteter, kålstuing og tyttebær. Ta frem foodprosessoren og lag dette knallgode måltidet! ", "pic": "https://images.matprat.no/lgdtvrdd4e-related/mobile", "url": "https://www.matprat.no/oppskrifter/tradisjon/kjottkaker/", "tags": ["default", "kjøttdeig", "hodekål", "melk", "potet", "mel"] },
        { "id": "8", "title": "Lasagne", "desc": "Nordmenn har mange favoritter fra det italienske kjøkken, deriblant hjemmelaget lasagne. Ovnsretten består av kjøttsaus og ostesaus som legges lagvis med pastaplater.", "pic": "https://res.cloudinary.com/norgesgruppen/images/c_scale,dpr_auto,f_auto,q_auto:eco,w_1600/x2dvimzvyhbtsbocic3i/hjemmelaget-lasagne", "url": "https://www.matprat.no/oppskrifter/familien/lasagne/", "tags": ["default", "kjøttdeig", "løk", "hvitløk", "tomat", "basilikum", "smør", "mel", "melk", "ost"] },
        { "id": "9", "title": "Ostesmørbrød", "desc": "Av det kjedelige, gamle brødet kan du trylle fram de mest fantastiske ostesmørbrød. ta en razzia i kjøleskapet og la hver enkelt sette sammen sine favoritter! Vi har laget våre ostesmørbrød vegetariske, men her kan du ta i bruk det aller meste.", "pic": "https://images.matprat.no/t3tm5eqde7-jumbotron/large", "url": "https://www.matprat.no/oppskrifter/rask/varme-ostesmorbrod/", "tags": ["default", "løk", "brød", "paprika", "ost", "ketchup"] },
        { "id": "10", "title": "Toast med stekt egg", "desc": "Hva er bedre enn en digg toast med ost og skinke? Jo, en ost- og skinketoast toppet med et deilig speilegg. Rask og enkel kosemat!", "pic": "https://images.matprat.no/l7eatl6nr5-jumbotron/large", "url": "https://www.matprat.no/oppskrifter/rask/toast-med-stekt-egg/", "tags": ["default", "ost", "egg", "brød", "smør"] },
        { "id": "11", "title": "Avokadotoast med sennep og egg", "desc": "Smør skivene med dijonsennep og legg på salatblader. Del avokado og ta ut steinen. Ta innmaten ut av skallet med en skje og skjær det i skiver. Gi dem en liten dytt så de legger seg i en pen vifteform og legg dem på brødskivene.", "url": "https://www.matprat.no/oppskrifter/kos/avokadotoast-med-sennep-og-egg/#:~:text=Sm%C3%B8r%20skivene%20med%20dijonsennep%20og,og%20legg%20dem%20p%C3%A5%20br%C3%B8dskivene.", "pic": "https://images.matprat.no/jbylk73bfb-jumbotron/large", "url": "", "tags": ["default", "egg", "avokado", "brød", "ruccula"] },
        { "id": "12", "title": "Toast med ruccula og granateple", "desc": "Disse digge mini-toastene er fylt med  smeltet ost, sennep, granateple og ruccula. Perfekt til å nyte som en liten koserett, eller servere som en liten forrett i et enkelt vennelag.", "pic": "https://images.matprat.no/3fkaqvdp6r-jumbotron/large", "url": "https://www.matprat.no/oppskrifter/rask/toast-med-ruccula-og-granateple/", "tags": ["default", "ost", "baguette", "ruccula", "smør"] },
        { "id": "13", "title": "Toast med lam og glasert løk", "desc": "Varm toast med smeltet ost kan varieres på utallige deilige måter! Denne toasten har vi fylt med glasert rødløk, chévre og lammekjøtt. Her kan du bruke ferdig tilberedt lammeskank fra butikken for den raske varianten.", "pic": "https://images.matprat.no/2v4eznnfvm-jumbotron/large", "url": "https://www.matprat.no/oppskrifter/rask/toast-med-lam-og-glasert-lok/", "tags": ["default", "brød", "lam", "ost", "løk"] },
        { "id": "14", "title": "Grønnkålsalat med crispy nakkekoteletter", "desc": "Grønnkål er en fantastisk grønnsak som kan brukes året rundt. Bruk den i en deilig råkostsalat sammen med tynne skiver av fennikel og en kremet dressing. Perfekt følge til crispy nakkekoteletter!", "pic": "https://images.matprat.no/flt4mpnzgc-jumbotron/large", "url": "https://www.matprat.no/oppskrifter/kos/gronnkalsalat-med-crispy-nakkekoteletter/", "tags": ["default", "egg", "nakkekotletter", "grønnkål", "mel", "olje", "sitron"] },
        { "id": "15", "title": "Egg i pesto", "desc": "Prøve deg på en av rettene som har gått viralt på TikTok? Her har du oppskriften på pesto egg som den også kalles - enkelt og smakfullt!", "pic": "https://images.matprat.no/5jxpt3e6jt-jumbotron/large", "url": "https://www.matprat.no/oppskrifter/rask/egg-i-pesto/", "tags": ["default", "egg", "spinat", "brød"] },
        { "id": "16", "title": "Smoothiebowl med mango", "desc": "En deilig og frisk mangosmoothie med kokos! Ha smoothien i en bowl, og topp med frisk frukt - en lekker, og fargerik avkjøling i sommervarmen.", "pic": "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2015/06/mango-smoothie-bowl-1.jpg", "url": "https://www.matprat.no/oppskrifter/sunn/smoothiebowl-med-mango/", "tags": ["default", "egg", "banan", "mango"] },
        { "id": "17", "title": "Eggsandwich", "desc": "En skikkelig digg eggsandwich! Denne sandwichen kalles også eggslut - kanskje ikke det det mest innbydende navnet på en rett, men navnet har den fått fra restauranten i USA som lanserte den. Retten smaker iallefall digg! Saftig eggerøre, sprøtt bacon og smeltet ost -  pakket sammen i en myk brioche. Nam!", "pic": "https://images.matprat.no/ae7l3vsbps-jumbotron/large", "url": "https://www.matprat.no/oppskrifter/rask/eggsandwich/", "tags": ["default", "egg", "brød", "ost", "bacon", "margarin"] },
        { "id": "18", "title": "Bønnegryte med tomat", "desc": "Denne deilige bønnegryten har røtter i Hellas, der den gjerne bakes over åpen ild i flere timer. Vi har forenklet retten litt, men fortsatt er det viktig at bønnene får nok tid over varmen, så de blir møre og trekker til seg de gode smakene fra tomat, rosmarin og hvitløk", "pic": "https://images.matprat.no/73x8ft7bpd-jumbotron/large", "url": "https://www.matprat.no/oppskrifter/gjester/bonnegryte-med-tomat/", "tags": ["default", "tomat", "bønner", "løk", "hviløk"] },
        { "id": "19", "title": "Speilegg med bakt tomat", "desc": "Speilegg er enkel hverdagslykke. Sleng på noen bakte tomater for litt ekstra farge, som er til å bli ekstra glad av! ", "pic": "https://images.matprat.no/xu88t5jb2j-jumbotron/large", "url": "https://www.matprat.no/oppskrifter/sunn/speilegg-med-bakt-tomat/", "tags": ["default", "egg", "tomat", "brød", "olje"] },
        { "id": "20", "title": "Tomat og mozzarellasalat på glass", "desc": "En salat med friske tomater og fersk mozzarella er aldri feil! Spis tomat- og mozzarellasalaten som et lite mellommåltid, til lunsj eller server den som forrett til dine gjester. ", "pic": "https://images.matprat.no/tc47e5v5z2-jumbotron/large", "url": "https://www.matprat.no/oppskrifter/kos/tomat--og-mozzarellasalat-pa-glass/", "tags": ["default", "tomat", "basilikum", "olje"] },
        { "id": "21", "title": "Kyllinggryte med kikerter, tomat og spinat", "desc": "Prøv denne superraske og enkle kyllinggryten med kikerter, hermetiske tomater og spinat. Dette er kjempegod og sunn hverdagskost!", "pic": "https://images.matprat.no/50d06d880d2f835f56001403-jumbotron/large", "url": "https://www.matprat.no/oppskrifter/sunn/kyllinggryte-med-kikerter-tomat-og-spinat/", "tags": ["default", "kylling", "spinat", "løk", "chili", "olje",] }
    ]
};
var obj;

function getMatretterListeFromDB() {
    get(child(dbRef, "users/" + uid)).then((snapshot) => {
        if (snapshot.exists()) {
            obj = snapshot.val();
            console.log("Extracted data: ")
            console.log(obj)
        } else {
            const writeListeData = async () => {
                try {
                    await set(ref(db, 'users/' + uid), matretter);
                } catch (ex) {
                    console.error(`Error while setting data: ${ex.message}`);
                }
            };
            writeListeData();
            getMatretterListeFromDB()
        }
    }).catch((error) => {
        console.error(error);
    });
}
getMatretterListeFromDB()
await new Promise(r => setTimeout(r, 500));

if (obj.matretter != null) {
    var matretterListe = obj.matretter.filter(matrett => {
        return matrett.tags.some(tag => filter.includes(tag))
    })

} else if (obj.matretter == null) {
    document.getElementById('show_nomorecards').style.display = 'block'
    document.getElementById('hide_nomorecards').style.display = 'none'
}




document.getElementById('filter').addEventListener('click', () => {
    popup.style.display = "flex";
});
document.querySelector('#close').addEventListener('click', () => {
    document.getElementById('popup').style.display = 'none';

    const user = auth.currentUser;
    const writeFilterData = async () => {
        try {
            await set(ref(db, 'filter/' + uid), filter);
        } catch (ex) {
            console.error(`Error while setting data: ${ex.message}`);
        }
    };
    writeFilterData();
    onValue(ref(db, 'filter/' + uid), (data) => {
        const filter = data.val();
        location.reload();
    });
});






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
    if (matretterListe != null) {
        if (index < matretterListe.length - 1) {
            currentCardInit(index)
            nextCardInit(index)
        } else if (index < matretterListe.length) {
            currentCardInit(index)
            document.getElementById('next_card').style.display = 'none'
        }
        if (index == matretterListe.length) {
            document.getElementById('current_card').style.display = 'none'
            document.getElementById('hide_nomorecards').style.display = 'none'
            document.getElementById('show_nomorecards').style.display = 'block'
        }
    }
}
nextMatrett(0)

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function saveLikedFood() {
    const db = getDatabase();
    const matrettData = matretterListe[index - 1]
    set(ref(db, 'users/' + uid + "/liked/" + matrettData.id), matrettData);
}

function saveDislikedFood() {
    const db = getDatabase();
    const matrettData = matretterListe[index - 1]
    set(ref(db, 'users/' + uid + "/disliked/" + matrettData.id), matrettData);
}


async function liked(index) {
    var card = document.getElementById('current_card');
    await delay(100)
    card.style.transition = 'none';
    card.style.opacity = '0';
    card.style.transform = 'none';
    var id = document.getElementById('current_title').textContent
    console.log("Liked " + id)
    saveLikedFood()
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
    saveDislikedFood()
    nextMatrett(index)
    card.style.opacity = '1';
}

async function btnliked(index) {
    var card = document.getElementById('current_card');
    var id = document.getElementById('current_title').textContent
    console.log("Liked " + id)
    await delay(300)
    card.style.transition = 'none';
    card.style.opacity = '0';
    card.style.transform = 'none';
    await delay(300)
    saveLikedFood()
    nextMatrett(index)
    card.style.opacity = '1';
    await delay(100)
    card.style.transition = 'none';
}

async function btndisliked(index) {
    var card = document.getElementById('current_card');
    var id = document.getElementById('current_title').textContent
    console.log("Disliked " + id)
    await delay(300)
    card.style.transition = 'none';
    card.style.opacity = '0';
    card.style.transform = 'none';
    await delay(300)
    saveDislikedFood()
    nextMatrett(index)
    card.style.opacity = '1';
    await delay(100)
    card.style.transition = 'none';
}


onValue(ref(db, 'users/' + uid + '/liked'), (snapshot) => {
    const data = snapshot.val();
    console.log("Extracted data: ")
    console.log(data)
    if (matretterListe != null) {
        matretterListe.forEach((matrett) => {
            if (data == null) {
                return
            } else {
                console.log('obj')
                Object.entries(data).forEach((data) => {
                    if (data[1].id == matrett.id) {
                        const removeFromList = async () => {
                            try {
                                await set(ref(db, 'users/' + uid + "/matretter/" + data[1].id), null);
                                console.log('removed obj')
                            } catch (ex) {
                                console.error(`Error while setting data: ${ex.message}`);
                            }
                        };
                        removeFromList();
                    }
                })

            }

        })
    }
});
onValue(ref(db, 'users/' + uid + '/disliked'), (snapshot) => {
    const data = snapshot.val();
    console.log("Extracted data: ")
    console.log(data)
    if (matretterListe != null) {
        matretterListe.forEach((matrett) => {
            if (data == null) {
                return
            } else {
                if (typeof (data) == 'object') {
                    Object.entries(data).forEach((data) => {
                        if (data.id == matrett.id) {
                            const removeFromList = async () => {
                                try {
                                    await set(ref(db, 'users/' + uid + "/matretter/" + data.id), null);
                                } catch (ex) {
                                    console.error(`Error while setting data: ${ex.message}`);
                                }
                            };
                            removeFromList();
                        }
                    })
                } else {
                    data.forEach((data) => {
                        if (data.id == matrett.id) {
                            const removeFromList = async () => {
                                try {
                                    await set(ref(db, 'users/' + uid + "/matretter/" + data.id), null);
                                } catch (ex) {
                                    console.error(`Error while setting data: ${ex.message}`);
                                }
                            };
                            removeFromList();
                        }
                    })
                }

            }

        })
    }
});




// KEEP THIS AT THE BOTTOM ITS A LOADER
document.getElementById("matswipemaincon").style.display = "flex";
document.getElementById("loader").style.display = "none";
document.getElementById("loader_text").style.display = "none";