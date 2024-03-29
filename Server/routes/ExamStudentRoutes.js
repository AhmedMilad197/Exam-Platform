const ExamStudentController = require('../controllers/ExamStudentController')

const ExamStudentRouter = require('express').Router()


ExamStudentRouter.post('/',ExamStudentController.create)

module.exports=ExamStudentRouter