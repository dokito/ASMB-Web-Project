const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Event Schema
const eventSchema = new Schema({
    nameOfEvent: {
        type: String,
        required: true
    },
    responsiblePeopleIds: [String],
    peopleInvolvedIds: [String],
    dateOfCreation: {
        type: Date,
        default: Date.now
    },
    dateAndTimeOfEnding: {
        type: Date
    }
}, {
    timestamps: true
});