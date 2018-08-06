var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    role: {type: String, default: 'STUDENT'}
}, {collection: 'user'});

module.exports = userSchema;