let matretter = {
    "matretter": [
        { "id": "001", "title": "Taco", "desc": "Taco som vi kjenner den! Oppskrift på klassisk norsk taco – fersk og hjemmelaget. Taco er en tradisjonell meksikansk rett som nordmenn har tatt til sitt hjerte og gjort litt sin egen. Fredagen er ofte ikke den samme uten fredagstaco.", "pic": "https://previews.123rf.com/images/gdolgikh/gdolgikh1703/gdolgikh170300221/74432760-%E7%89%9B%E8%82%89%E3%81%AE%E3%82%BF%E3%82%B3%E3%82%B9.jpg" },
        { "id": "002", "title": "Pasta Bolognese", "desc": "Pasta bolognese er nok en av verdens mest populære retter, og den skal inneholde storfekjøtt i små biter, pancetta som er en type bacon, løk, gulrøtter, selleri, tomat, kjøttkraft, vin og eventuelt melk. ", "pic": "https://coop.no/globalassets/coop-extra/mat--trender/rask-pasta-bolognese-1200-720.gif?preset=Large" },
        { "id": "003", "title": "Bruschetta", "desc": "Bruschetta er en matrett fra Italia. Den består av grillede eller stekte biter av brød eller baguett med hvitløk og olivenolje påsmurt og med saltdryss.", "pic": "https://pagen.no/globalassets/recept/bruchetta.jpg?w=734&h=462&mode=crop&resized=true" },
        { "id": "004", "title": "Tomatsuppe", "desc": "Tomatsuppe er en suppe laget av tomater. Den serveres både varm og kald, og er ofte brukt som ingrediens i mer avanserte retter. Det er også vanlig å tilsette makaroni eller egg.", "pic": "https://husglede.no/wp-content/uploads/2020/08/TOmatsuppe-hovedbilde.jpg" },
        { "id": "005", "title": "Salat", "desc": "Salat er en kald, eller lun matrett som inneholder en blanding oppskårne eller strimlete ingredienser. Ingrediensene er ofte rå, og kan omfatte bladgrønnsaker som salat, spinat eller lignende vekster, ulike grønnsaker, frukt, nøtter, kjøtt og sjømat.", "pic": "https://www.aperitif.no/storage/image/core_files/2015/3/2/de4912925c946321bb7d45d2431833fc/jpg/aperitif/article_details_medium/original.jpg" }
    ]
};

obj = JSON.parse(JSON.stringify(matretter));



function nextMatrett(index) {
    var jsonat = index + 1;
    if (jsonat >= obj.matretter.length) {
        alert('Ingen fler oppskrifter tilgjenglig.')
        location.reload();
    }
    var index_current = index;
    var current_pic_value = obj.matretter[index_current].pic;
    var current_title_value = obj.matretter[index_current].title;
    var current_desc_value = obj.matretter[index_current].desc;

    var index_next = index_current + 1;
    var next_pic_value = obj.matretter[index_next].pic;
    var next_title_value = obj.matretter[index_next].title;
    var next_desc_value = obj.matretter[index_next].desc;

    var current_pic = document.getElementById("current_pic")
    var current_title = document.getElementById("current_title")
    var current_desc = document.getElementById("current_desc")

    current_pic.src = current_pic_value;
    current_title.innerHTML = current_title_value;
    current_desc.innerHTML = current_desc_value;

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
nextMatrett(0)

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function liked(index) {
    var card = document.getElementById('current_card');
    card.style.transition = 'none';
    card.style.opacity = '0';
    card.style.transform = 'none';
    console.log("liked")
    await delay(300)
    nextMatrett(index)
    card.style.opacity = '1';
    await delay(100)
    card.style.transition = 'all 0.3s ease-in-out';
}

async function disliked(index) {
    var card = document.getElementById('current_card');
    card.style.transition = 'none';
    card.style.opacity = '0';
    card.style.transform = 'none';
    console.log("liked")
    await delay(300)
    nextMatrett(index)
    card.style.opacity = '1';
    await delay(100)
    card.style.transition = 'all 0.3s ease-in-out';
}

async function btnliked(index) {
    var card = document.getElementById('current_card');
    console.log("liked")
    await delay(300)
    card.style.transition = 'none';
    card.style.opacity = '0';
    card.style.transform = 'none';
    await delay(300)
    nextMatrett(index)
    card.style.opacity = '1';
    await delay(100)
    card.style.transition = 'all 0.3s ease-in-out';
}

async function btndisliked(index) {
    var card = document.getElementById('current_card');
    console.log("disliked")
    await delay(300)
    card.style.transition = 'none';
    card.style.opacity = '0';
    card.style.transform = 'none';
    await delay(300)
    nextMatrett(index)
    card.style.opacity = '1';
    await delay(100)
    card.style.transition = 'all 0.3s ease-in-out';
}