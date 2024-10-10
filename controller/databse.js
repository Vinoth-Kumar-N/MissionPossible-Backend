const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.on('connected' , () => {
    console.log('Connected to MongoDB');
})
db.on('error', () => {
    console.log('Error connecting to MongoDB');
})

exports.module = db;