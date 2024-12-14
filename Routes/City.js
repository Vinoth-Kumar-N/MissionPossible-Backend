const City = require('../models/City');

const router=require('express').Router();

router.post('/addCity',async(req,res)=>{
    try {
        const {coverimg,ratings,price,cityimg,cityname,description,lat,lon}=req.body;
        const city=new City({coverimg,ratings,price,cityimg,cityname,description,lat,lon});
        await city.save();
        res.status(200).send({message:"Data Added successfully!"});
    } catch (error) {
        res.status(400).send({message:"Failed to add Data!",error});
    }
});


router.get('/getCity',async(req,res)=>{
    try {
        const Data=await City.find();
        res.status(200).send({message:"Data Recieved successfully!",data:Data});
    } catch (error) {
        res.status(400).send({message:"Failed to add Data!",error});
    }
});




module.exports=router;