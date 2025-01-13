require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on('connected' , () => {
    console.log('Connected to MongoDB');
})
db.on('error', () => {
    console.log('Error connecting to MongoDB');
})

app.use(cors({
    // origin: 'https://mission-possible-frontend.vercel.app', 
    origin: 'https://mission-possible-frontend-eight.vercel.app', 
    // origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

const port = process.env.PORT || 1111;



app.get('/', (req, res) => {
    res.send('Hello vinoth server is running');
})
app.listen(port, () => {
    console.log('Server is running on port http://localhost:' + port);
})

const City=require('./Routes/City');
const Feature=require('./Routes/Feature');
app.use('/user', require('./Routes/UserRegRoute'));
app.use('/api/v8',City);
app.use('/api/v9',Feature);

