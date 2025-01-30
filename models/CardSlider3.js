const mongoose = require('mongoose');

const cardSlider3Schema = new mongoose.Schema({
    title: String,
    description: String,
    link: String,
    image: String
}, { timestamps: true });

module.exports = mongoose.model('CardSlider3', cardSlider3Schema);
