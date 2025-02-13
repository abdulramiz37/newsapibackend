const express = require('express');
const multer = require('multer');
const CardSlider2 = require('../models/CardSlider2');
const router = express.Router();
const path = require('path');


// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Add a new card with image upload
router.post('/add2', upload.single('image'), async (req, res) => {
    try {
        const { title, description, link } = req.body;
        const image = req.file ? req.file.filename : null;

        const newCard = new CardSlider2({ title, description, link, image });
        await newCard.save();

        res.status(201).json({ message: 'Card added successfully', data: newCard });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all cards
router.get('/', async (req, res) => {
    try {
        const cards = await CardSlider2.find();
        res.json(cards);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a card by ID
router.put('/update2/:id', upload.single('image'), async (req, res) => {
    try {
        const { title, description, link } = req.body;
        let updatedData = { title, description, link };

        if (req.file) {
            updatedData.image = req.file.filename;
        }

        const updatedCard = await CardSlider2.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!updatedCard) {
            return res.status(404).json({ error: 'Card not found' });
        }

        res.json(updatedCard);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a card by ID
router.delete('/delete2/:id', async (req, res) => {
    try {
        const deletedCard = await CardSlider2.findByIdAndDelete(req.params.id);
        if (!deletedCard) {
            return res.status(404).json({ error: 'Card not found' });
        }
        res.json({ message: 'Card deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
