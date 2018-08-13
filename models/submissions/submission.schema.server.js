var mongoose = require('mongoose');
var submissionSchema = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuizModel'
    },
    answers: [{
      fillBlanksAnswer: {
          variable: String,
          value: String
      },
        multipleChoiceAnswer: Number,
        trueFalseAnswer: Boolean,
        essayAnswer: String,
        question: {
          type: mongoose.Schema.Types.ObjectId,
            ref: 'QuestionModel'
        }
    }]
}, {collection: 'submission'});
module.exports = submissionSchema