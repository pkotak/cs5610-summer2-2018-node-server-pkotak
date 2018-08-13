module.exports = function (app) {
    createQuiz = (req, res) => {
        var quiz = req.body;
        quizModel.createQuiz(quiz)
            .then(quiz => res.json(quiz));
    }

    findAllQuizzes = (req, res) => {
        quizModel.findAllQuizzes()
            .then(quizzes => res.json(quizzes));
    }

    findQuizById = (req, res) => {
        quizModel.findQuizById(req.params.qId)
            .then(quiz => res.json(quiz));
    }

    updateQuiz = (req, res) => {
        var quiz = req.body;
        quizModel.updateQuiz(req.params.qId, quiz)
            .then(status => res.send(status));
    }

    deleteQuiz = (req, res) => {
        quizModel.deleteQuiz(req.params.qId)
            .then(status => res.send(status));
    }

    addQuestion = (req, res) => {
        quizModel.addQuestion(req.params.quizId, req.params.questionId)
            .then(
                status => res.send(status),
                error => res.send(error)
            )
    }

    submitQuiz = (req, res) => {
        var quiz = req.body;
        let answers = this.createAnswers(quiz.questions);
        var submission = {
             student: req.session['currentUser']._id,
             quiz: req.params.qId,
            answers: answers
        }
        submissionModel.submitQuiz(submission)
            .then(
                status => res.send(status),
                error => res.send(error)
            )
    }

    findAllSubmissions = (req, res) =>
        submissionModel.findAllSubmissions()
            .then(response => res.json(response))

    findSubmissionById = (req, res) =>
        submissionModel.findSubmissionById(req.params.submissionId)
            .then(response => res.json(response))

    findAllSubmissionsForStudent = (req, res) =>
        submissionModel.findAllSubmissionsForStudent(req.session['currentUser']._id)
            .then(response => res.json(response))

    findAllSubmissionsForQuiz = (req, res) =>
        submissionModel.findAllSubmissionsForQuiz(req.params.qId)
            .then(response => res.json(response))

    createAnswers = questions => {
        let answers = [];
        questions.map(question => {
            switch (question.questionType) {
                case 'FILL_BLANKS':
                    answers.push({fillBlanksAnswer: question.fillBlanksAnswer});
                    break;
                case 'TRUE_FALSE':
                    answers.push({trueFalseAnswer: question.trueFalseAnswer});
                    break;
                case 'CHOICE':
                    answers.push({multipleChoiceAnswer: question.multipleChoiceAnswer});
                    break;
                case 'ESSAY':
                    answers.push({essayAnswer: question.essayAnswer});
                    break;
                default:
                    return answers;
            }
        })
        return answers;
    }

    app.post('/api/quiz', createQuiz);
    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:qId', findQuizById);
    app.post('/api/quiz/:qId/submission', submitQuiz);
    app.get('/api/quiz/:qId/submission', findAllSubmissionsForStudent);
    app.get('/api/quiz/:qId/submission/:submissionId', findSubmissionById);
    app.get('/api/submission', findAllSubmissions);
    app.put('/api/quiz/:qId', updateQuiz);
    app.delete('/api/quiz/:qId', deleteQuiz);
    app.put('/api/quiz/:quizId/question/:questionId', addQuestion);
    var quizModel = require('../models/quizzes/quiz.model.server');
    var submissionModel = require('../models/submissions/submission.model.server');
}