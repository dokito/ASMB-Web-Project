const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');

require('dotenv').config();

//User Model
const User = require('../models/user');

//@route POST api/auth
//@desc Auth the user
//@access Public
router.post('/', (req, res) => {
    const { email , password } = req.body;

    //Validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'please enter all fields'});
    }

    //Check for existin user
    User.findOne( { email }).then((user) => {
        if (!user) return res.status(400).json({ msg: 'User does not exist'});

        //Validate password
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (!isMatch) return res.status(400).json({ msg:'Invalid Credentials' });

            jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            university: user.university,
                            email: user.email,
                            points: user.points,
                            isAdmin: user.isAdmin,
                            isStudent: user.isStudent,
                            isUser: user.isUser
                        }
                    });
                }
            );
        })
    });
});

//@route GET api/auth/user
//@desc GET user data
//@access Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;