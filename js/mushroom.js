// CONSTANTS

let items = [
	{
		name: "Shiitake Mushroom", 
		image: "images/portabello.png",
		description: "It has has dark gills and a brown cap.",
		value: 2
	}, {
		name: "Portabello Mushroom",
		image: "images/portabello.png",
		description: "It has a wide, thick cap.",
		value: 1
	}, {
		name: "Amarita Mushroom", // poisonous
		image: "images/portabello.png",
		description: "It has a metallic cap.",
		value: -2
	}, {
		name: "Morel",
		image: "images/portabello.png",
		description: "It smells nutty.",
		value: 3
	}, {
		name: "False Morel",
		image: "images/portabello.png",
		description: "find out what it smells like.",
		value: -1
	}, {
		name: "Chantarelle", 
		image: "images/portabello.png",
		description: "It smells like apricots.",
		value: 2
	}, {
		name: "Grass",
		image: "images/portabello.png",
		description: "This is grass.",
		value: 0,
	}, {
		name: "Onion", 
		image: "images/portabello.png",
		description: "The bulb at the bottom is round and papery.",
		value: 1
	}, {
		name: "Leek", 
		image: "images/portabello.png",
		description: "The leaves are green and long.",
		value: 1
	}, {
		name: "Necklace", 
		image: "images/portabello.png",
		description: "This seems like it could be valuable.",
		value: 3
	}
];

// STATE VARIABLES 
let floor = [];
let inBasket = [];

// CACHED ELEMENTS
let images = document.querySelectorAll('td img');
let table = document.querySelector('table');
// basket stuff
let basket = document.querySelectorAll('li img');

// modal stuff
let info = document.getElementById("information");
let name = document.getElementById("info-name");
let infoImg = document.getElementById("info-img");
let infoText = document.getElementById("info-text");
let basketButton = document.getElementById("add-button");
let ignoreButton = document.getElementById("ignore");
let currentItem;

// EVENT LISTENERS
// table.addEventListener('click', storeId);
// table.addEventListener('click', pick);
images.forEach((ele, idx) => {
	ele.addEventListener('click', storeId);
	ele.addEventListener('click', pick);
});

basketButton.addEventListener('click', addBasket);
ignoreButton.addEventListener('click', goBack);

// FUNCTIONS

// generates the items on the forest floor
function forestFloor () {
	// to-do: make images into an array that contains a random mix of potential elements
	images.forEach ((ele, idx) => { 
		let picture = items[idx].image;
		images[idx].setAttribute('src', picture);
	});
 }
forestFloor();

// creates a popup window and populates it with info about the clicked item
function pick(event) {
	console.log("You picked it!");
	// load information into popup screen
	//squareId = parseInt(event.target.id.replace('sq','')); my square id is undefined 

	infoImg.setAttribute('src', items[currentItem].image);
	infoText.innerText = items[currentItem].description;
	name.innerText = items[currentItem].name;
	// open up popup screen
	 info.style.display = "block";
 }

function storeId(event) {
	currentItem = parseInt(event.target.id.replace('sq',''));
}

 // gets you out of the popup
 window.onclick = function(event) {
  if (event.target == info) {
    info.style.display = "none";
  }
}

// adds items to basket and removes them from forest floor
function addBasket () {
	// remove image by changing its display property to none
	let reconstructedId = "#sq" + currentItem ; 
	document.querySelector(reconstructedId).setAttribute("src", ""); 
	//add item to basket (add item and display image)
		inBasket.push(items[currentItem]);
		// cycle through basket
		for (item of basket) {
			if (!item.getAttribute('src')) {
			console.log(item);
			item.setAttribute('src', items[currentItem].image);
			break;
			}
		}

	//leave the info modal
	info.style.display = "none";
}

// takes the player back to the original screen
function goBack () {
	info.style.display = "none";
}

// const goToTally () {
// 	// happens when you move to the tally stage
// }

// const giveScore () {
// 	// adds up all the items and then shows you your score
// }