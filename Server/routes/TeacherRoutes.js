const TeacherController = require('../controllers/TeacherController.js')

const Teacherrouter = require('express').Router()

Teacherrouter.post('/login',TeacherController.login)

Teacherrouter.post('/block',TeacherController.block)

Teacherrouter.post('/addTeacher',TeacherController.addTeacher)

Teacherrouter.post('/availableTeachers',TeacherController.availableTeachers)

Teacherrouter.post('/students',TeacherController.getStudents)

Teacherrouter.post('/questions',TeacherController.getQuestions)

Teacherrouter.post('/exams',TeacherController.getExams)

Teacherrouter.get('/allTeacher',TeacherController.getAllTeacher)

Teacherrouter.get('/published',TeacherController.getPublishedTeacher)

Teacherrouter.post('/send-password', TeacherController.sendPassword)

Teacherrouter.get('/:id',TeacherController.getOneTeacher)

Teacherrouter.put('/:id',TeacherController.updateTeacher)

Teacherrouter.delete('/:id',TeacherController.deleteTeacher)

module.exports=Teacherrouter