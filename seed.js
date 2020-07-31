const db=require('./models');
const mongoose=require('mongoose');

const items = [
	{
		name: "Shiitake Mushroom", 
		image: "images/Shiitake.png",
		description: "It has has dark gills and a brown cap. The stems of this mushroom are tough and woody.",
		value: 1
	}, {
		name: "Portabello Mushroom",
		image: "images/portabello.png",
		description: "It has a wide, thick cap. In its smaller form, these are called button mushrooms.",
		value: 1
	}, {
		name: "Amanita Mushroom",
		image: "images/amanita-mushroom.png",
		description: "This colorful mushroom seems vaguely familiar.",
		value: -2
	}, {
		name: "Morel",
		image: "images/morchella.png",
		description: "This mushroom smells like fresh milk. In Kentucky, they call them Hickory Chickens.",
		value: 1
	}, {
		name: "False Morel",
		image: "images/false_morel (1).png",
		description: "The smell of this mushroom is faintly floral.",
		value: -1
	}, {
		name: "Chantarelle", 
		image: "images/chanterelle-mushrooms-1-1 (1).png",
		description: "It smells like apricots and has a mild peppery taste.",
		value: 2
	}, {
		name: "Inky Cap",
		image: "images/shaggymane.png",
		description: "This little mushroom takes it name from the dark liquid that oozes from its gills.",
		value: 1
	},{
		name: "Apricot Jelly",
		image: "images/apricotjelly.png",
		description: "This brightly colored mushroom is associated with rotting wood.",
		value: 1
	}, {
		name: "Porcini",
		image: "images/porcini.png",
		description: "This popular mushroom has a rich, nutty taste. Its name means 'little pig' in italian.",
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
		name: "Black Morel",
		image: "images/blackmorel.png",
		description: "This dark mushroom is native to North America.",
		value: 1,
	},{
		name: "Destroying Angel",
		image: "images/deathcap.png",
		description: "This pure white mushroom has a veil circling the upper stalk.",
		value: -1,
	},{
		name: "Death Cap",
		image: "images/destroyingangel.png",
		description: "This mushroom's cap can come in a wide variety of colors.",
		value: -1,
	},{
		name: "Grass",
		image: "images/grass.png",
		description: "This is grass.",
		value: 0,
	}, {
		name: "Puffball", 
		image: "images/puffball.png",
		description: "These white mushrooms are meaty and round.",
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
	}, {
		name: "Ring", 
		image: "images/darkring.png",
		description: "This ring gives off a powerful aura of menace.",
		value: 3
	},{
		name: "Wow! It's nothing.", 
		image: "images/placeholder.png",
		description: "There's nothing here.",
		value: 0
	}, {
		name: "Invisible Mushroom", 
		image: "images/placeholder.png",
		description: "Just kidding. There's nothing here.",
		value: 0
	}, {
		name: "Yet Another Placeholder", 
		image: "images/placeholder.png",
		description: "Actually, there's quite a few atoms here.",
		value: 0
	}
];

db.Mushroom.create(items,(err,newMushrooms)=> {//run it first 
	if(err){
		console.log(err);
		process.exit();
    }
    
    console.log(`${newMushrooms.length} mushrooms added`);
});