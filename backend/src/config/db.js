const mongoose = require('mongoose')

async function connecttodb() {
    try {
       await mongoose.connect(process.env.mongo_uri);
        console.log('connected');
        
    } catch (error) {
        console.error('MongoDB connection failed:', error.message)
        throw error
    }
    
}

module.exports = connecttodb;
