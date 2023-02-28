const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema( 
    {
        username: {
            type: String,
            require: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        password: {
            type: String,
            required: true,
            minlength: 5
        },
        pxEntered: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Participant'
            }
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

// PRE middleware password hashing
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
  };

// Virtuals
userSchema.virtual('pxEnteredCount').get(function() {
    return this.pxEntered.length;
})

userSchema.virtual('commentNumber').get(function() {
    return this.comments.length;
});

const User = model('User', userSchema);

module.exports = User;