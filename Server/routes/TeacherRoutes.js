const TeacherController = require('../controllers/TeacherController.js')

const Teacherrouter = require('express').Router()

Teacherrouter.post('/login',TeacherController.login)

Teacherrouter.post('/block',TeacherController.block)

Teacherrouter.post('/addTeacher',TeacherController.addTeacher)

Teacherrouter.post('/availableTeachers',TeacherController.availableTeachers)

Teacherrouter.post('/students',TeacherController.getStudents)

Teacherrouter.post('/students/remove',TeacherController.removeStudent)

Teacherrouter.post('/questions',TeacherController.getQuestions)

Teacherrouter.post('/course/questions',TeacherController.getCourseQuestions)

Teacherrouter.post('/sendOTP',TeacherController.sendPassword)

Teacherrouter.post('/otp-verification',TeacherController.verifyOTP)

Teacherrouter.post('/reset-password',TeacherController.resetPassword)

Teacherrouter.post('/exams',TeacherController.getExams)

Teacherrouter.get('/allTeacher',TeacherController.getAllTeacher)

Teacherrouter.get('/courses/:id',TeacherController.TeacherCourses)

Teacherrouter.get('/published',TeacherController.getPublishedTeacher)

Teacherrouter.post('/send-password', TeacherController.sendPassword)

Teacherrouter.get('/:id',TeacherController.getOneTeacher)



module.exports=Teacherrouter