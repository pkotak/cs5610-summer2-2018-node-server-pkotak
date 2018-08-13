var mongoose = require('mongoose');
var submissionSchema = require('./submission.schema.server');
var submissionModel = mongoose.model('SubmissionModel', submissionSchema);

submitQuiz = submission =>
    submissionModel.create(submission)

findAllSubmissions = () =>
    submissionModel.find()

findSubmissionById = id =>
    submissionModel.findById(id)
        .populate({
            path: 'quiz',
            populate: {path: 'questions'}
        })
        .exec()

findAllSubmissionsForStudent = studentId =>
    submissionModel.find({student: studentId})
        .populate({
            path: 'quiz',
            populate: {path: 'questions'}
        })
        .exec()

findAllSubmissionsForQuiz = quizId =>
    submissionModel.find({quiz: quizId})

var api = {
    submitQuiz,
    findAllSubmissions,
    findAllSubmissionsForStudent,
    findAllSubmissionsForQuiz,
    findSubmissionById

}
module.exports = api;