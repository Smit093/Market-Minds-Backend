const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlength: 500 },
    link: { type: String, required: true, maxlength: 500 },
    code: { type: String, required: true, maxlength: 500 },
    likes: { type: Number, default: 0 }, // Use Number for likes
    description: { type: String, required: true } // Use String for description
});

// Create the Video model
const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;