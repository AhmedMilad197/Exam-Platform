const StudentController = require('../controllers/StudentController')

const Studentrouter = require('express').Router()



Studentrouter.post('/addStudent',StudentController.addStudent)

Studentrouter.post('/login',StudentController.login)

Studentrouter.post('/exams',StudentController.exams)

Studentrouter.post('/courses',StudentController.courses)

Studentrouter.get('/allStudent', StudentController.getAllStudent)

Studentrouter.get('/available/:courseId', StudentController.availableStudents)

Studentrouter.get('/:id',StudentController.getOneStudent)

Studentrouter.put('/:id',StudentController.updateStudent)

Studentrouter.delete('/:id',StudentController.deleteStudent)

module.exports=Studentrouter