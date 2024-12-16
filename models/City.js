const mongoose=require('mongoose');


const City=new mongoose.Schema({
    coverimg:{
        type:String,
        required:true
    },
    ratings:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    cityimg:{
        type:String,
        required:true
    },
    cityname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    lat:{
        type:String,
        required:true
    },
    lon:{
        type:String,
        required:true
    },
});

const CityModel=mongoose.model('City',City);
module.exports=CityModel;