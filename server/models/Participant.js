const { Schema, model } = require('mongoose');

const participantSchema = new Schema (
    {
        pxFirstName: {
            type: String,
            required: 'You need to enter a participant first name!',
        },
        pxLastName: {
            type: String,
            required: 'You need to enter a participant last name'
        },
        pxStatus: {
            type: String
        },
        pxAge: {
            type: Number,
            required: 'You need to enter a participant age',
            min: 1,
            max: 100
        },
        pxStudy: {
            type: String,
            required: 'You need to enter a participant study'
        },
        pxStudyDate: {
            type: Date,
            default: Date.now
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

const Participant = model('Participant', participantSchema);

module.exports = Participant;