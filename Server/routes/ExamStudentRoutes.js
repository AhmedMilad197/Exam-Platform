const ExamStudentController = require('../controllers/ExamStudentController')

const ExamStudentRouter = require('express').Router()


ExamStudentRouter.post('/',ExamStudentController.create)

ExamStudentRouter.post('/exam',ExamStudentController.getScore)

ExamStudentRouter.get('/students/:id',ExamStudentController.getStudents)

ExamStudentRouter.get('/excel/store/:id',ExamStudentController.storeToExcel)

module.exports=ExamStudentRouter