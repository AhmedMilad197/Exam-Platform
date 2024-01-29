const TeacherController = require('../controllers/TeacherController.js')

const Teacherrouter = require('express').Router()



Teacherrouter.post('/addTeacher',TeacherController.addTeacher)

Teacherrouter.get('/allTeacher',TeacherController.getAllTeacher)

Teacherrouter.get('/published',TeacherController.getPublishedTeacher)




Teacherrouter.get('/:id',TeacherController.getOneTeacher)

Teacherrouter.put('/:id',TeacherController.updateTeacher)

Teacherrouter.delete('/:id',TeacherController.deleteTeacher)

module.exports=Teacherrouter