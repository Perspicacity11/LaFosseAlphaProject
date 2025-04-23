const bcrypt = require('bcrypt');
const jwt =require("jsonwebtoken")

const User = require('../models/user_models');

async function signup (req, res) {
    const data = req.body;
    // Generate a salt
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS))
    // Use salt to hash the plaintext password and reassign to data object
    data["password"] = await bcrypt.hash(data.password, salt)
    // Pass data into the model
    const result = await User.create(data)
    res.status(201).send(result);
};

async function login (req, res) {
    const data = req.body;
    try {
        // Use the username to retrieve all information all about the user
        const user = await User.getOneByUsername(data.username)
        if (!user) { throw new Error("No user with this username")}
        const match = await bcrypt .compare(data.password, user.password)

        if (match) {
            //Create a playload
            const payload = { username: user.username}
            // define a function which sends token to the client
            const sendToken = (err, token) => {
                if (err) {
                    throw new Error("Error in token generation")
                } res.status(200).json ({ 
                    success: true,
                    token: token
                })
            }
            jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: 3600 }, sendToken)
        } else {
            throw new Error("User could not be authenticated.")
        }
    } catch(err){
        res.status(401).json({ error: err.message })
    }
    res.status(200).send(data);
}

module.exports = {
    signup, login
}                           