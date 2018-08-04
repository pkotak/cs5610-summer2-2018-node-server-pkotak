var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model('EnrollmentModel', enrollmentSchema);

enrollStudentInSection = enrollment =>
    enrollmentModel.create(enrollment);

findSectionsForStudent = studentId =>
    enrollmentModel
        .find({student: studentId})
        .populate('section')
        .exec()

module.exports = {
    enrollStudentInSection: enrollStudentInSection,
    findSectionsForStudent: findSectionsForStudent
}