const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Post Schema
const userSchema = mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

// Export Model
module.exports = mongoose.model('User', userSchema);