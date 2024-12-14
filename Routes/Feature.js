const Feature = require('../models/Feature');

const router=require('express').Router();

router.post('/addFeature',async(req,res)=>{
    try {
        const {imageurl,date,description,name}=req.body;
        const feature=new Feature({imageurl,date,description,name});
        await feature.save();
        res.status(200).send({message:"Data Added successfully!"});
    } catch (error) {
        res.status(400).send({message:"Failed to add Data!",error});
    }
});


router.get('/getFeature',async(req,res)=>{
    try {
        const Data=await Feature.find();
        res.status(200).send({message:"Data Recieved successfully!",data:Data});
    } catch (error) {
        res.status(400).send({message:"Failed to add Data!",error});
    }
});




module.exports=router;