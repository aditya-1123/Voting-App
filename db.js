const mongoose = require('mongoose');                   
require('dotenv').config();

// Define the mongoDB connection URL
const mongoURL = process.env.MONGODB_URL_LOCAL // 'hotels' is the database name
// const mongoURL = process.env.MONGODB_URI;
console.log('MongoDB URL:', mongoURL);
// Set up MongoDB connection 
mongoose.connect(mongoURL)    
    .then(() => {
        console.log('Connected to MongoDB server');
    })
    .catch((err) => {
        console.log('MongoDB connection error:', err);
    });

const db = mongoose.connection;

module.exports = db;