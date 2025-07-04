const Item = require('../models/Item');

// Submit new item
exports.submitItem = async (req, res) => {
    try {
        const { type, name, description, location, date, contact } = req.body;

        const newItem = new Item({
            type,
            name,
            description,
            location,
            date,
            contact,
            image: req.file ? req.file.path : null
        });

        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all items
exports.getItems = async (req, res) => {
    try {
        const items = await Item.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};