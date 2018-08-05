module.exports = function (app) {
  app.post('/api/course/:courseId/section', createSection);
  app.get('/api/section', findAllSections);
  app.get('/api/course/:courseId/section', findAllSectionsForCourse);
  app.get('/api/section/:sectionId', findSectionById);
  app.get('/api/student/section', findSectionsForStudent);
  app.put('/api/section/:sectionId', updateSection);
  app.delete('/api/section/:sectionId', removeSection);
  app.post('/api/section/:sectionId/enrollment', enrollStudentInSection);
  var sectionModel = require('../models/sections/section.model.server');
  var enrollmentModel = require('../models/enrollment/enrollment.model.server');

  function createSection(req, res) {
      var section = req.body;
      sectionModel.createSection(section)
          .then(section => res.json(section));
  }

  function enrollStudentInSection(req, res) {
    var sectionId = req.params['sectionId'];
    var studentId = req.session['currentUser']._id;
    var toEnroll = req.body.toEnroll;
    var enrollment = {
        student: studentId,
        section: sectionId
    }

    if(toEnroll)
        sectionModel
            .decrementSectionSeats(sectionId)
            .then(() => {return enrollmentModel.enrollStudentInSection(enrollment)})
            .then(enrollment => res.json(enrollment));
    else
        sectionModel
            .incrementSectionSeats(sectionId)
            .then(() => {return enrollmentModel.removeStudentInSection(studentId, sectionId)})
            .then(enrollment => res.json(enrollment));
  }

  function findAllSections(req, res) {
      sectionModel.findAllSections()
          .then(sections => res.json(sections));
  }
  function findAllSectionsForCourse(req, res) {
      var id = req.params['courseId'];
      return sectionModel.findAllSectionsForCourse(id)
                .then(sections => res.json(sections))
  }
  
  function findSectionById(req, res) {
      var id = req.params['sectionId'];
      return sectionModel.findSectionById(id)
          .then(section => res.json(section));
  }

  function findSectionsForStudent(req, res) {
      var studentId = req.session['currentUser']._id;
      return enrollmentModel
          .findSectionsForStudent(studentId)
          .then(enrollments => res.json(enrollments));
  }
  function updateSection(req, res) {
      var id = req.params['sectionId'];
      var section = req.body;
      return sectionModel.updateSection(id, section)
          .then(section => res.json(section));
  }

  function removeSection(req, res) {
      var id = req.params['sectionId'];
      return sectionModel.removeSection(id)
          .then(res.send(200));
  }
};