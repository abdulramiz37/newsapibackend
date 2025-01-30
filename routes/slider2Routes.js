const express = require('express');
const CardSlider2 = require('../models/CardSlider2');
const router = express.Router();

// Add multiple cards
router.post('/add', async (req, res) => {
    try {
        const cards = await CardSlider2.insertMany(req.body);
        res.status(201).json({ message: 'Cards added successfully', data: cards });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all cards from Slider 2
router.get('/', async (req, res) => {
    try {
        const cards = await CardSlider2.find();
        res.json(cards);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
