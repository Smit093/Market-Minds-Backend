const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    creator: { type: String, required: true },
    img: { type: String, required: true },
    ratings: { type: Number, min: 0, max: 5 },
    price: { type: String },
    link: { type: String }
});

// Create a model from the schema
const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;