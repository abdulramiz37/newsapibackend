const mongoose = require('mongoose');

const cardSlider1Schema = new mongoose.Schema({
    title: String,
    description: String,
    link: String,
    image: String
}, { timestamps: true });

module.exports = mongoose.model('CardSlider1', cardSlider1Schema);
