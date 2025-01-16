const mongoose = require('mongoose');

const Hotel = mongoose.Schema({
    id : {
        type: String,
        required : true
    },
    Name:{
        type: String,
        required : true
    },
    hotelImgUrl : {
        type: String,
        required : true
    },
    rating: {
        type: Number,
        required : true
    },
    Price: {
        type: String,
        required : true
    },
    Description: {
        type: String,
        required : true
    }
})


const HotelModel = mongoose.model('Hotels', Hotel);
module.exports = HotelModel;