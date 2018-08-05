var mongoose = require('mongoose');
var sectionSchema = mongoose.Schema({
   name: String,
   seats: Number,
    maxSeats: Number,
    courseId: Number
}, {collection: 'section'});

module.exports = sectionSchema;