var mongoose = require('mongoose');
var sectionSchema = require('./section.schema.server');
var sectionModel = mongoose.model('SectionModel', sectionSchema);

function createSection(section) {
    return sectionModel.create(section);
}
function findAllSections() {
    return sectionModel.find();
}

function findAllSectionsForCourse(courseId) {
    return sectionModel.find({courseId: courseId});
}

function findSectionById(sectionId) {
    return sectionModel.findOne({_id: sectionId})
}

function updateSection(sectionId, section) {
    return sectionModel.update({_id: sectionId},{$set: section})
}

function removeSection(sectionId) {
    return sectionModel.remove({_id: sectionId})
}

function decrementSectionSeats(sectionId) {
    return sectionModel.update({_id: sectionId}, {$inc: {seats: -1}});
}

function incrementSectionSeats(sectionId) {
    return sectionModel.update({_id: sectionId}, {$inc: {seats: +1}});
}

module.exports = {
    createSection: createSection,
    findAllSections, findAllSections,
    findAllSectionsForCourse: findAllSectionsForCourse,
    findSectionById: findSectionById,
    updateSection: updateSection,
    removeSection: removeSection,
    decrementSectionSeats: decrementSectionSeats,
    incrementSectionSeats: incrementSectionSeats
}