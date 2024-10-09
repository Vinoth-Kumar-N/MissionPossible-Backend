const express = require('express');
const UserRegModel = require('../models/UserRegSchema');

const router = express.Router();


router.get('/all', async (req, res) => {
    try {
        const result = await UserRegModel.find();
        if (!result) {
            res.status(500).json('No Users Found');
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
})


router.post('/register', async (req, res) => {
    const { name, email, phone, password, repassword } = req.body;
    try {
        const temp = await UserRegModel.findOne({ email: req.body.email });
        if (temp) {
            return res.status(400).json({ message: 'User already exists' });
        }

        await UserRegModel.create(req.body);
        return res.status(200).json({ message: 'User Registered Successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        const temp = await UserRegModel.findOne({email : email});
        if(!temp){
            return res.status(200).json({ message: "User does not Exist" });
        }

        if (password !== temp.password) {
            return res.status(200).json({ message: "Incorrect Password" });
        }

        return res.status(200).json({ message: "Login Successful" });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});



router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const currentrecord = await UserRegModel.findOne({ _id: id });
        if (!currentrecord) {
            res.status(400).json({ message: "record not found" });
        }
        const currentdata = await UserRegModel.findByIdAndDelete(id);
        res.status(200).json(currentdata);

    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;






















// const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// const phoneRegex = /^\d{10}$/;
// const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

// const emailCheck = (em) => {
//     return emailRegex.test(em);
// }
// const phnoCheck = (ph) => {
//     return phoneRegex.test(ph);
// }

// if (!emailCheck(email)) {
//     return res.status(400).json({ message: 'Invalid Email' });
// }

// if (!phnoCheck(phone)) {
//     return res.status(400).json({ message: 'Invalid Phone Number' });
// }

// if (!passwordRegex.test(password)) {
//     return res.status(400).json({
//         message: 'Password must contain at least one digit, one lowercase, and one uppercase letter, and must be between 6 and 20 characters'
//     });
// }

// if (password !== repassword) {
//     return res.status(400).json({ message: 'Passwords do not match' });
// }