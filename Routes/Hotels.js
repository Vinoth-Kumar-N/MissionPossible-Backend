const HotelModel = require('../models/Hotels');
const router = require('express').Router();


router.get('/getHotels/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log('Fetching hotel with id:', id);
        const data = await HotelModel.find({ id });
        console.log(data);
        if (data) {
            res.status(200).send({ message: "Data Recieved successfully!", data });
        } else {
            res.status(400).send({ message: "Failed to get Data!" });
        }
    } catch (error) {
        res.status(400).send({ message: "Failed to get Data!", error });
    }
});

router.post('/addHotel', async (req, res) => {
    try {
        const { id, hotelImgUrl, rating, Description, Name, Price } = req.body;
        const hotEl = new HotelModel({ id, hotelImgUrl, rating, Description, Name, Price });
        await hotEl.save();
        res.status(201).send({ message: "Data Added successfully!" });
    } catch (error) {
        res.status(400).send({ message: "Failed to add Data!", error });
    }
});
router.delete('/deleteAllHotels/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await HotelModel.findByIdAndDelete(id);
        res.status(200).send({ message: "Data Deleted successfully!" });
    } catch (error) {
        res.status(400).send({ message: "Failed to delete Data!", error });
    }
});

module.exports = router;