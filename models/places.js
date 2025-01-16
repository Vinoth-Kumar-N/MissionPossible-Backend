const mongoose = require('mongoose');
const Places = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    placeImgUrl : {
        type: String,
        required : true
    },
    placeName : {
        type: String,
        required : true
    }
})

const PlacesModel = mongoose.model('Places', Places);
module.exports = PlacesModel;