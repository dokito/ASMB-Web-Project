const { Router } = require('express');

const User = require('../models/user');

const router = Router();

router.get('/', async(req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        next(error);
    }
});

router.post('/', async(req, res, next) => {
    try {
        const user = new User(req.body);
        const createdUser = await user.save();
        res.json(createdUser);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(422);
        }
        next(error);
    }
});

module.exports = router;