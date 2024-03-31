const ExamStudentController = require('../controllers/ExamStudentController')

const ExamStudentRouter = require('express').Router()


ExamStudentRouter.post('/',ExamStudentController.create)

ExamStudentRouter.get('/students/:id',ExamStudentController.getStudents)

module.exports=ExamStudentRouter