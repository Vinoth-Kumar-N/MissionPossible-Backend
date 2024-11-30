const express = require('express');
const UserModel = require('../models/UserRegSchema')
const AuthController = require('../controller/authController');

const router = express.Router();


router.get('/all', AuthController.showUsers);
router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);



router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const currentrecord = await UserModel.findOne({ _id: id });
        if (!currentrecord) {
            res.status(400).json({ message: "record not found" });
        }
        const currentdata = await UserModel.findByIdAndDelete(id);
        res.status(200).json(currentdata);

    } catch (error) {
        res.status(500).json(error);
    }
})
router.delete('/deleteAll', async (req, res) => {
    try {
        UserModel.deleteMany().then(() => {
            res.status(200).json({ message: "All records deleted" });
        })
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