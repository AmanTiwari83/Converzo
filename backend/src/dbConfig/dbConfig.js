require('dotenv').config()
const mongoose = require('mongoose');

const dbConfig = async () => {
    try {
        const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/converz';
        await mongoose.connect(dbURI);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}

module.exports = dbConfig;