const AuthenticationController = require("./controllers/AuthenticationController")
const TeacherController = require("./controllers/TeacherController")
const QuestionController = require("./controllers/QuestionController")

module.exports = (app) => {
  app.post('/register', AuthenticationController.register);
  app.post('/teacher', TeacherController.show);
  app.post('/question', QuestionController.show);
}