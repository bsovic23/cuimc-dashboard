const { model, Schema } = require('mongoose');

const commentSchema = new Schema (
    {   
        username: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
         commentType: {
            type: String
        },
        commentBody: {
            type: String
        }
    }
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;