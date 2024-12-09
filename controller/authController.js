const UserModel = require('../models/UserRegSchema')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

async function showUsers(req, res){
    try {
        const users = await UserModel.find();
        if(users.length === 0) return res.status(400).json({message: "No users Found"});
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

async function registerUser(req, res){
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


const authControler = {
    showUsers,
    registerUser,
    loginUser
}

module.exports = authControler;