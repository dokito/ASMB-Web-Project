const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

require('dotenv').config();

//Event Model
const Event = require('../models/event');

//@route GET api/events
//@desc Get All Events
//@access Public
router.get('/', (req, res) => {
    Event.find()
    .sort({dateOfCreation: -1})
    .then(events => res.json(events))
});

//@route POST api/events
//@desc Create A Event
//@access Private
router.post('/', (req, res) => {
    const newEvent = new Event({
        nameOfEvent: req.body.nameOfEvent,
        dateAndTimeOfEnding: req.body.dateAndTimeOfEnding
    });

    newEvent.save().then(event => res.json(event));
});

//@route DELETE api/events/:id
//@desc DELETE A Event
//@access Private
router.delete('/:id', (req, res) => {
    Event.findById(req.params.id)
    .then(event => event.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}))
});

module.exports = router;
