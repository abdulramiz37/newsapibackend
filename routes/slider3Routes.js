const express = require('express');
const CardSlider3 = require('../models/CardSlider3');
const router = express.Router();

// Add multiple cards
router.post('/add', async (req, res) => {
    try {
        const cards = await CardSlider3.insertMany(req.body);
        res.status(201).json({ message: 'Cards added successfully', data: cards });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all cards from Slider 3
router.get('/', async (req, res) => {
    try {
        const cards = await CardSlider3.find();
        res.json(cards);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
