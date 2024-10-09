const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL || 'mongodb+srv://newtemp:temp@cluster0.pnwhz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const db = mongoose.connection;

db.on('connected' , () => {
    console.log('Connected to MongoDB');
})
db.on('error', () => {
    console.log('Error connecting to MongoDB');
})

exports.module = db;