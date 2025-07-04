const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    type: { type: String, enum: ['lost', 'found'], required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, default: Date.now },
    contact: { type: String, required: true },
    image: { type: String }, // Stores image path
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', ItemSchema);