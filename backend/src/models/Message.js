const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    id: Number,
    user: String,
    content: String
});

module.exports = mongoose.model('Message', MessageSchema)