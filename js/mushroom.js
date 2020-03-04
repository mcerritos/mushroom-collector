// CONSTANTS

let items = [
	{
		name: "Shiitake Mushroom", 
		image: "images/Shiitake.png",
		description: "It has has dark gills and a brown cap.",
		value: 1
	}, {
		name: "Portabello Mushroom",
		image: "images/portabello.png",
		description: "It has a wide, thick cap.",
		value: 1
	}, {
		name: "Amanita Mushroom", // poisonous
		image: "images/amanita-mushroom.png",
		description: "This colorful mushroom seems vaguely familiar.",
		value: -2
	}, {
		name: "Morel",
		image: "images/morchella.png",
		description: "This mushroom smells like fresh milk.",
		value: 3
	}, {
		name: "False Morel",
		image: "images/false_morel (1).png",
		description: "The smell of this mushroom is faintly floral.",
		value: -1
	}, {
		name: "Chantarelle", 
		image: "images/chanterelle-mushrooms-1-1 (1).png",
		description: "It smells like apricots.",
		value: 2
	}, {
		name: "Shaggy Mane",
		image: "images/shaggymane.png",
		description: "This little mushroom has dark gills.",
		value: 1
	},{
		name: "Apricot Jelly",
		image: "images/apricotjelly.png",
		description: "This brightly colored mushroom is associated with rotting wood.",
		value: 1
	}, {
		name: "Porcini",
		image: "images/porcini.png",
		description: "This popular mushroom has a rich, nutty taste.",
		value: 2
	}, {
		name: "Black Trumpet",
		image: "images/black trumpet.png",
		description: "This dark mushroom can be difficult to spot.",
		value: 1
	}, {
		name: "Oyster Mushroom",
		image: "images/oyster.png",
		description: "This sweet mushroom smells faintly of anise.",
		value: 1
	}, {
		name: "Grass",
		image: "images/grass.png",
		description: "This is grass.",
		value: 0,
	}, {
		name: "Puffball", 
		image: "images/puffball.png",
		description: "This cluster of white mushrooms are meaty and round.",
		value: 1
	}, {
		name: "Leek", 
		image: "images/leek.png",
		description: "The leaves are green and long.",
		value: 1
	}, {
		name: "Ring", 
		image: "images/ring (1).png",
		description: "This seems like it could be valuable.",
		value: 3
	}
];

let backgrounds = ["images/log.jpg", "images/redgreen (1).png", "images/forest scene.jpg"];

// STATE VARIABLES 
let inBasket = [];
let floor = [];

// CACHED ELEMENTS
let images = document.querySelectorAll('.f > img');
let table = document.querySelector('table');
// basket stuff
let basket = document.querySelectorAll('.b');

// info stuff
let info = document.getElementById("information");
let tally = document.getElementById("tally");
let start = document.getElementById("start");
let name = document.getElementById("info-name");
let infoImg = document.getElementById("info-img");
let infoText = document.getElementById("info-text");

//buttons
let startButton = document.getElementById("begin");
let addButton = document.getElementById("add-button");
let removeButton = document.getElementById("remove");
let ignoreButton = document.getElementById("ignore");
let scoreButton = document.getElementById('scoreButton');
let repeatButton = document.getElementById('repeat');

let music = document.querySelector('audio');
let body = document.querySelector('body');
let itemization = document.getElementById("score-breakdown");
let currentItem;

// EVENT LISTENERS
// table.addEventListener('click', storeId);
// table.addEventListener('click', pick);
images.forEach((ele) => {
	ele.addEventListener('click', pick);
});
basket.forEach((ele) => {
	ele.addEventListener('click', examine);
});

startButton.addEventListener('click', tutorial);
addButton.addEventListener('click', addBasket);
removeButton.addEventListener('click', removeBasket);
ignoreButton.addEventListener('click', goBack);
scoreButton.addEventListener('click', getScore);
repeatButton.addEventListener('click', createFloor);

window.onload = function(){start.style.display = "block"};

// FUNCTIONS

function tutorial () {
	start.style.display = "none";
	createFloor();
}

function createFloor () {
	// functions to reset game
	floor = [];
	inBasket = [];
	tally.style.display = "none";
	music.play();
	for (item of basket) {
		item.setAttribute('src', "images/placeholder.png");
		}
	let bindex =Math.floor( Math.random() * (backgrounds.length) );
	let background =  backgrounds[bindex];
	let setting = `url("${ background }")` ;
	console.log(setting);
	document.querySelector('body').style.backgroundImage = setting ;
	
	// create new set of pickables 
	for (x = 0; x < 10; x++) {
	// pick a random number from within the length of the array
	let index = Math.floor(Math.random() * (items.length));
	// add that item to the forest floor
		floor.push(items[index]);
		}
	// return the array of objects
	floor.forEach ((ele, idx) => { 
		let picture = ele.image;
		images[idx].setAttribute('src', picture);
	});
 }

// creates a popup window and populates it with info about the clicked item
function pick(event) {
	// load information into popup screen
	currentItem = parseInt(event.target.id.replace('sq','')); 
	infoImg.setAttribute('src', floor[currentItem].image);
	infoText.innerText = floor[currentItem].description;
	name.innerText = floor[currentItem].name;
	// open up popup screen
	addButton.style.display = "inline";
	removeButton.style.display = "none";
	info.style.display = "block";
 }

 function examine(event) {
	// load information into popup screen
	currentItem = parseInt(event.target.id.replace('b','')); //figure out how to access id of item 
	infoImg.setAttribute('src', inBasket[currentItem].image);
	infoText.innerText = inBasket[currentItem].description;
	name.innerText = inBasket[currentItem].name;
	// open up popup screen
	removeButton.style.display = "inline";
	addButton.style.display = "none";
	info.style.display = "block";
 }

 // gets you out of the popup
 window.onclick = function(event) {
  if (event.target == info) {
    info.style.display = "none";
  }
  else if (event.target == start) {
  	start.style.display = "none";
  }
  else if (event.target == tally) {
  	tally.style.display = "none";
  }  
}

// adds items to basket and removes them from forest floor
function addBasket () {
	// remove image by changing its display property to none
	let reconstructedId = "#sq" + currentItem ; 
	document.querySelector(reconstructedId).setAttribute("src", ""); 
	//add item to basket (add item and display image)
		// cycle through basket
		for (item of basket) {
			if (item.getAttribute('src') == "images/placeholder.png") {
			inBasket.push(floor[currentItem]);
			item.setAttribute('src', floor[currentItem].image);
			break;
			}
		}
		if (inBasket.length > 0) {
			scoreButton.style.display = "block";
		}
	//leave the info modal
	info.style.display = "none";
}

function removeBasket () {
	// remove item from list
	inBasket.splice(currentItem, 1);
	// remove image from list "images/placeholder.png"
	let basketLocation = "#b" +currentItem;
	document.querySelector(basketLocation).setAttribute("src", "images/placeholder.png");
	info.style.display = "none";
}

// takes the player back to the original screen
function goBack () {
	info.style.display = "none";
}

// creates a modal displaying your score
function getScore () {
	let score = 0;
	// clear out any previous elements 
	while (itemization.hasChildNodes()) {
		itemization.removeChild(itemization.childNodes[0]);
	}
	//
	inBasket.forEach((ele) => {
		score += ele.value;
		//
		let img = document.createElement('img');
		img.setAttribute('src', ele.image);
		document.getElementById('score-breakdown').appendChild(img);
		// show name
		let name = document.createElement('h2');
		name.innerText = ele.name;
		document.getElementById('score-breakdown').appendChild(name);
		// create show value
		let value = document.createElement('h2');
		value.innerText = ele.value;
		document.getElementById('score-breakdown').appendChild(value);

	});
	// display score screen
	document.getElementById('final-score').innerText = "Final Score: " + score;
	tally.style.display = "block";
}