const mongoose = require('mongoose');

const cardSlider2Schema = new mongoose.Schema({
    title: String,
    description: String,
    link: String,
    image: String
}, { timestamps: true });

module.exports = mongoose.model('CardSlider2', cardSlider2Schema);