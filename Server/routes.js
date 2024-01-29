const AuthenticationController = require("./controllers/AuthenticationController")
const QuestionController = require("./controllers/QuestionController")
const TeacherController = require("./controllers/TeacherController")
const StudentController = require("./controllers/StudentController")
const SubjectController = require("./controllers/SubjectController")

// review the routes once you implement jwt authentication. 
module.exports = (app) => {
  app.post('/register', AuthenticationController.register);
  app.post('/question', QuestionController.show);
  app.post('/question/list', QuestionController.index);
  app.get('/questions', TeacherController.questions);
  app.post('/teacher', TeacherController.show);
  app.post('/student', StudentController.show);
  app.post('/student/update', StudentController.update);
  app.get('/student/:subject', StudentController.index);
  app.post('/subject', SubjectController.show);
  app.post('/subject/update', SubjectController.update);
}