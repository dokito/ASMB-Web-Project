const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

//User Model
const User = require('../models/user');

//@route GET api/users
//@desc Get app users
//@access Public
router.get('/', (req, res) => {
    User.find()
    .sort({createdAt: -1})
    .then(users => res.json(users));
})

//@route POST api/users
//@desc Register new user
//@access Public
router.post('/', (req, res) => {
    const { firstName, lastName, university, email, password } = req.body;

    //Validation
    if (!firstName || !lastName || !university || !email || !password) {
        return res.status(400).json({ msg: 'please enter all fields'});
    }

    //Check for existing user
    User.findOne({ email }).then((user) => {
        if (user) return res.status(400).json({ msg: 'User already exists'});

        const newUser = new User({
            firstName,
            lastName,
            university,
            email,
            password
        });

        //Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save().then((user) => {
                    jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn:3600 }, (err, token) => {
                        if (err) throw err;
                        res.json({

                            user: {
                                id: user.id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                university: user.university,
                                email: user.email
                            }
                        });
                    });
                });
            });
        });
    });
});

module.exports = router;