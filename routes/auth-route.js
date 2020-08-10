const router = require('express').Router();
const User = require('../models/user');
const HttpStatusCode = require('http-status-codes');
const { registerValidation, loginValidation } = require('../validations/user-validation');
const bcrypt = require('bcryptjs');

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
module.exports = router;