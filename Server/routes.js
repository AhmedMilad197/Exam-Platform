const AuthenticationController = require("./controllers/AuthenticationController")
const QuestionController = require("./controllers/QuestionController")
const TeacherController = require("./controllers/TeacherController")
const StudentController = require("./controllers/StudentController")

module.exports = (app) => {
  app.post('/register', AuthenticationController.register);
  app.post('/question', QuestionController.show);
  app.post('/teacher', TeacherController.show);
  app.post('/student', StudentController.show);
}