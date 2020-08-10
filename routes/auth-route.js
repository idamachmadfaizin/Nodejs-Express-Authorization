const router = require('express').Router();
const User = require('../models/user');
const HttpStatusCode = require('http-status-codes');
const { registerValidation, loginValidation } = require('../validations/user-validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    // LEST VALIDATION REGISTER USER
    const { error } = registerValidation(req.body);
    if (error) return res.status(HttpStatusCode.BAD_REQUEST).send(error.details[0].message);

    // CHECK EMAIL ALREADY EXISTS
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(HttpStatusCode.BAD_REQUEST).send('Email already exists!');

    // HASHIGN PASSWORD
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // -- Or --
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // CREATE A NEW USER
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        console.log(savedUser);
        res.status(200).send({ user: user._id });
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/login', async (req, res) => {
    // LEST VALIDATION REGISTER USER
    const { error } = loginValidation(req.body);
    if (error) return res.status(HttpStatusCode.UNAUTHORIZED).send(error.details[0].message);

    // CHECK EMAIL EXISTS
    const userExist = await User.findOne({ email: req.body.email });
    if (!userExist) return res.status(HttpStatusCode.UNAUTHORIZED).send('Email is not found!');
    // PASSWORD VALIDATION
    const passwordValid = await bcrypt.compare(req.body.password, userExist.password);
    if (!passwordValid) return res.status(HttpStatusCode.UNAUTHORIZED).send('Invalid password');

    // CREATE JWT TOKEN
    const token = jwt.sign({ _id: userExist._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).status(HttpStatusCode.OK).send(token);
});

module.exports = router;