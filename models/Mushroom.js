import { Mongoose } from "mongoose";

const MushroomSchema = new Mongoose.Schema({
    name: String,
    image: String,
    description: String,
    value: Number
});

const Mushroom = mongoose.model('Mushroom', MushroomSchema);

module.exports = Mushroom;