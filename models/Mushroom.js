const mongoose = require('mongoose');

const MushroomSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    value: Number
});

const Mushroom = mongoose.model('Mushroom', MushroomSchema);

module.exports = Mushroom;