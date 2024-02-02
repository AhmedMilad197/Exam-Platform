const StudentController = require('../controllers/StudentController')

const Studentrouter = require('express').Router()



Studentrouter.post('/addStudent',StudentController.addStudent)

Studentrouter.post('/login',StudentController.login)

Studentrouter.get('/allStudent', StudentController.getAllStudent)

Studentrouter.get('/:id',StudentController.getOneStudent)

Studentrouter.put('/:id',StudentController.updateStudent)

Studentrouter.delete('/:id',StudentController.deleteStudent)

module.exports=Studentrouter