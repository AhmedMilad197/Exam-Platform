const AuthenticationController = require("./controllers/AuthenticationController")
const QuestionController = require("./controllers/QuestionController")
const TeacherController = require("./controllers/TeacherController")
const StudentController = require("./controllers/StudentController")
const SubjectController = require("./controllers/SubjectController")

module.exports = (app) => {
  app.post('/register', AuthenticationController.register);
  app.post('/question', QuestionController.show);
  app.post('/question/list', QuestionController.index);
  app.post('/teacher', TeacherController.show);
  app.post('/student', StudentController.show);
  app.post('/student/update', StudentController.update);
  app.post('/subject', SubjectController.show);
  app.post('/subject/update', SubjectController.update);
}