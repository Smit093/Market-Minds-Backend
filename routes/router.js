const express = require("express");
const router = express.Router();
const Video = require("../models/videos");
const Book = require("../models/books.js");
const Course = require("../models/courses.js");
const User = require("../models/user.js");
const Review = require("../models/reviews.js")
const mongoose = require("mongoose");
require('dotenv').config();
// Connect to MongoDB
// const localURL = "mongodb://127.0.0.1:27017/Market-Minds"
const AtlasURL = process.env.ATLASDB_URL
console.log(AtlasURL);
const mongooseConnect = async () => {
    try {
        await mongoose.connect(AtlasURL);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};

// Call the connection function
mongooseConnect();

router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json({ reviews });
        console.log(reviews);
    } catch (err) {
        console.error("Error fetching reviews:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Fetch all videos when /videos is hit
router.get('/videos', async (req, res) => {
    try {
        const videos = await Video.find(); // Fetch all videos from the database
        res.json(videos); // Send the retrieved videos as a JSON response
    } catch (err) {
        console.error("Error fetching videos:", err);
        res.status(500).json({ message: "Internal Server Error" }); // Send error response if something goes wrong
    }
});

// Fetch all books when /books is hit
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find(); // Fetch all books from the database
        res.json(books); // Send the retrieved books as a JSON response
    } catch (err) {
        console.error("Error fetching books:", err);
        res.status(500).json({ message: "Internal Server Error" }); // Send error response if something goes wrong
    }
});

// Fetch all courses when /courses is hit
router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find(); // Fetch all courses from the database
        res.json(courses); // Send the retrieved courses as a JSON response
    } catch (err) {
        console.error("Error fetching courses:", err);
        res.status(500).json({ message: "Internal Server Error" }); // Send error response if something goes wrong
    }
});

// User Sign-Up
router.post('/signup', async (req, res) => {
    const { name, email, password, gender } = req.body;

    // Validate input data
    if (!name || !email || !password || !gender) {
        setError("All fields are required.");
        return;
    }

    try {
        // Create a new user instance
        const newUser = new User({
            name,
            email,
            password,
            gender
        });

        // Save the new user to the database
        await newUser.save();

        // Send a success response
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (err) {
        console.error("Error creating user:", err);

        // Handle duplicate email error
        if (err.code === 11000) {
            return res.status(400).json({ message: "Email already exists." });
        }

        res.status(500).json({ message: "Internal Server Error" }); // Send error response if something goes wrong
    }
});

router.get('/login', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.json(users);
    } catch (e) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Internal Server Error" }); // Send error response if something goes wrong
    }
});

// User Reviews Submission
router.post('/reviews', async (req, res) => {
    const { name, review, ratings, gender } = req.body;

    // Validate input data
    if (!name || !review || !gender) {
        return res.status(400).json({ message: "Name, review, and gender are required." });
    }

    if (ratings < 0 || ratings > 5) {
        return res.status(400).json({ message: "Ratings must be between 0 and 5." });
    }

    try {
        // Create a new review instance
        const newReview = new Review({
            name,
            review,
            ratings,
            gender
        });

        // Save the new review to the database
        await newReview.save();

        // Send a success response
        res.status(201).json({ message: "Review submitted successfully", review: newReview });
    } catch (err) {
        console.error("Error submitting review:", err);

        // Handle potential errors (e.g., database issues)
        res.status(500).json({ message: "Internal Server Error" }); // Send error response if something goes wrong
    }
});


module.exports = router;