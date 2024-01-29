const StudentController = require('../controllers/StudentController')

const Studentrouter = require('express').Router()



Studentrouter.post('/addStudent',StudentController.addStudent)

Studentrouter.get('/allStudent',StudentController.getAllStudent)

Studentrouter.get('/:id',StudentController.getOneStudent)

Studentrouter.put('/:id',StudentController.updateStudent)

Studentrouter.delete('/:id',StudentController.deleteStudent)

module.exports=Studentrouter