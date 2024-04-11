const StudentExamHistoryRoutes = require('../controllers/StudentExamHistoryController')

const ExamStudentRouter = require('express').Router()


ExamStudentRouter.post('/',StudentExamHistoryRoutes.create)

module.exports=ExamStudentRouter