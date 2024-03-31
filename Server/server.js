
const express = require('express')
const cors = require('cors')

const app = express()

//middlewre
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


//Config
const  router = require ('./routes/ConfigRoutes.js')
app.use('/api/Configs',router)
//Course
const Courserouter = require('./routes/CourseRourtes.js');
app.use('/api/Course',Courserouter)
//Exam
const Examrouter = require('./routes/ExamRoutes.js');
app.use('/api/Exam',Examrouter)
//Teacher
const Teacherrouter = require('./routes/TeacherRoutes.js');
app.use('/api/Teacher',Teacherrouter)
//Question
const Questionrouter = require('./routes/QuestionRoutes.js');
app.use('/api/Questions',Questionrouter)
//Student
const Studentrouter = require('./routes/StudentRoutes.js');
app.use('/api/Student',Studentrouter)
//Study 
const Studyrouter = require('./routes/StudyRoutes.js');
app.use('/api/Study',Studyrouter)
//ExamStudent
const ExamStudentRouter = require('./routes/ExamStudentRoutes.js');
app.use('/api/ExamStudent', ExamStudentRouter)

//testing api 
app.get('/',(req,res)=>{
    res.json({message: 'hello from api'})
})

//port
const PORT = process.env.PORT||3000
//Server
app.listen (PORT,()=>{
    console.log(`server is running on port${PORT}`)
})