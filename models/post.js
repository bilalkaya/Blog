const mongoose = require('mongoose');

// Post Schema
const postSchema = mongoose.Schema({
    title: String,
    header: String,
    body: String,
    img: String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: { type: Boolean, default: false },
    meta: {
        votes: Number,
        favs: Number
    }
});

// Export Model
module.exports = mongoose.model('Post', postSchema);