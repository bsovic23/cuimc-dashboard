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
        pxAge: {
            type: String,
            required: 'You need to enter a participant age'
        },
        pxStudy: {
            type: String,
            required: 'You need to enter a participant study'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

const Participant = model('Participant', participantSchema);

module.exports = Participant;