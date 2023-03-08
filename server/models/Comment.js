const { model, Schema } = require('mongoose');

const commentSchema = new Schema (
    {
        commentBody: {
            type: String
        },
        commentType: {
            type: String
        }
    }
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;