const express = require('express');
const CardSlider1 = require('../models/CardSlider1');
const router = express.Router();

// Add multiple cards
router.post('/add', async (req, res) => {
    try {
        const cards = await CardSlider1.insertMany(req.body);
        res.status(201).json({ message: 'Cards added successfully', data: cards });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all cards from Slider 1
router.get('/', async (req, res) => {
    try {
        const cards = await CardSlider1.find();
        res.json(cards);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a card by ID (updated route)
router.put('/update/:id', async (req, res) => {
    try {
        const updatedCard = await CardSlider1.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCard) {
            return res.status(404).json({ error: 'Card not found' });
        }
        res.json(updatedCard);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a card by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedCard = await CardSlider1.findByIdAndDelete(req.params.id);
        if (!deletedCard) {
            return res.status(404).json({ error: 'Card not found' });
        }
        res.json({ message: 'Card deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
