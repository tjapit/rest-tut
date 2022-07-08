const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
    registerValidation,
    loginValidation,
} = require("../validation");

/* GET all User in DB */
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(400).send({ message: err });
    }
};

/* Register a User to DB */
const registerUser = async (req, res) => {
    // validate data before creating User
    const { error } = registerValidation(req.body);
    // error checking
    if (error) return res.status(400).send(error.details[0].message);

    // checking if User is already in DB
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
        return res.status(400).send("Email already exists");

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    // try saving to DB
    try {
        const savedUser = await user.save();
        res.send({ _id: savedUser._id });
    } catch (err) {
        res.status(400).send({ message: err });
    }
};

/* Login a User */
const loginUser = async (req, res) => {
    // validate login data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if User exists
    const user = await User.findOne({
        email: req.body.email,
    });
    // User not in DB
    if (!user)
        return res.status(400).send("Incorrect email/password");

    // Checking validity of password
    const validPass = await bcrypt.compare(
        req.body.password,
        user.password
    );
    // Invalid password
    if (!validPass)
        return res.status(400).send("Incorrect email/password");

    // Create and assign a token
    const token = jwt.sign(
        { _id: user._id },
        process.env.TOKEN_SECRET
    );
    res.header("auth-token", token).send("Successfully logged in!");
}

/* GET User by ID */
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (err) {
        res.status(400).send({ message: err });
    }
};

/* DELETE a User from DB */
const deleteUser = async (req, res) => {
    try {
        const removedUser = await User.findByIdAndDelete(
            req.params.userId
        );
        res.json(removedUser);
    } catch (err) {
        res.status(400).send({ message: err });
    }
}

module.exports = {
    getAllUsers,
    registerUser,
    getUser,
    loginUser,
    deleteUser
};
