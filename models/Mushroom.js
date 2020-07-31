const mongoose = require('mongoose');
const random = require('mongoose-simple-random');

const MushroomSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    value: Number
});
MushroomSchema.plugin(random);

const Mushroom = mongoose.model('Mushroom', MushroomSchema);

module.exports = Mushroom;