const mongoose = requre('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cuimc-dashboard', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

module.exports = mongoose.connection;