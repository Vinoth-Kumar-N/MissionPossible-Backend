const router = require('express').Router();
const PlacesModel = require('../models/places');

router.get('/getPlaces/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await PlacesModel.find({id});
        // const data = await PlacesModel.find();
        if(data){
            res.status(200).send({message:"Data Recieved successfully!",data});
        }else{
            res.status(400).send({message:"No Data Found!"});
        }
    } catch (error) {
        res.status(400).send({message:"Failed to get Data!",error});
    }
});

router.post('/addPlace', async (req, res) => {
    try {
        const {id, placeImgUrl,placeName}=req.body;
        const place=new PlacesModel({id, placeImgUrl,placeName});
        await place.save();
        res.status(201).send({message:"Data Added successfully!"});
    } catch (error) {
        res.status(400).send({message:"Failed to add Data!",error});
    }
});

module.exports = router;