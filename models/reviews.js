const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    review: { type: String, required: true },
    ratings: { type: Number, min: 0, max: 5 },
    gender: { type: String, required: true },
});

const Review = mongoose.model("Review",ReviewSchema);

module.exports = Review;