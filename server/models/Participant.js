const { Schema, model } = require('mongoose');

const participantSchema = new Schema (
    {
        username: {
            type: String
        },
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
        },
        comment: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    }
);

const Participant = model('Participant', participantSchema);

module.exports = Participant;