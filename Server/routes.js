const AuthenticationController = require("./controllers/AuthenticationController")
const TeacherController = require("./controllers/TeacherController")

module.exports = (app) => {
  app.post('/register', AuthenticationController.register);
  app.post('/teacher', TeacherController.show);
}