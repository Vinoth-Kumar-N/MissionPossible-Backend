const UserModel = require('../models/UserRegSchema')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

async function showUsers(req, res) {
    try {
        const users = await UserModel.find();
        if (users.length === 0) return res.status(400).json({ message: "No users Found" });
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function registerUser(req, res) {
    try {
        const temp = await UserModel.findOne({ email: req.body.email });
        if (temp) {
            return res.status(400).json({ message: 'User already exists' });
        }
        await UserModel.create(req.body);
        res.status(201).send({ message: 'User Registered Successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: "User does not exist" });
        }

        // Compare password
        const isMatch = await user.comparePassword(password); // Ensure this is correctly implemented in your schema
        if (!isMatch) {
            return res.status(400).send({ message: "Incorrect Password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
        const finalData = {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        };

        // Send response
        res.status(201).send(finalData);
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

// async function sendMail(req, res) {
//     const { email, message } = req.body;
//     try {
//         let transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//         });

//         async function sendMail(req, res) {
//             const { email, message } = req.body;
//             try {
//                 if (!email || !message) {
//                     return res.status(400).send('Email and message are required.');
//                 }

//                 let transporter = nodemailer.createTransport({
//                     service: 'gmail',
//                     auth: {
//                         user: process.env.EMAIL_USER, // Use env variables
//                         pass: process.env.EMAIL_PASS, // Use env variables
//                     },
//                 });

//                 let mailOptions = {
//                     from: process.env.EMAIL_USER, // Sender's email
//                     to: email,                   // Receiver's email
//                     subject: "Message to Travel Mate",
//                     text: message,
//                 };

//                 transporter.sendMail(mailOptions, (error, info) => {
//                     if (error) {
//                         console.error('Error sending email:', error.message);
//                         return res.status(500).send('Error sending email');
//                     }
//                     console.log('Email sent: ' + info.response);
//                     res.status(200).send('Email sent successfully');
//                 });
//             } catch (error) {
//                 console.error('Unexpected error:', error.message);
//                 res.status(500).send('Unexpected error occurred');
//             }
//         }
//     } catch (error) {
//         res.status(500).send('Error sending email', error);
//     }
// }

const authControler = {
    showUsers,
    registerUser,
    loginUser
}

module.exports = authControler;