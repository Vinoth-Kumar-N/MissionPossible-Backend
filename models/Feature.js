const mongoose=require('mongoose');

const Feature=new mongoose.Schema({
    imageurl:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
});


const featureModel = mongoose.model('Feature',Feature);
module.exports = featureModel;