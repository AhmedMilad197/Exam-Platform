const ExamController = require('../controllers/ExamController')

const Examrouter = require('express').Router()



Examrouter.post('/addExam',ExamController.addExam)

Examrouter.get('/allExam',ExamController.getAllExam)

Examrouter.post('/',ExamController.getOneExam)

Examrouter.put('/:id',ExamController.updateExam)

Examrouter.delete('/:id',ExamController.deleteExam)

module.exports=Examrouter