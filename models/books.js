const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    cover: { type: String, required: true },
    ratings: { type: Number, min: 0, max: 5 },
    reviews: { type: String },
    available: { type: String },
    link: { type: String }
});

// Create a model from the schema
const Book = mongoose.model('Book', BookSchema);

module.exports = Book;