const { Sequelize, DataTypes } = require('sequelize');
const dbConfig =require('../config/dbConfig.js')


const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,{

        host:dbConfig.HOST,
        dialect:dbConfig.dialect,


        pool:{

            max:dbConfig.pool.max,
            min:dbConfig.pool.main,
            acquire:dbConfig.acquire,
            idle:dbConfig.idle
        }
    }
)

sequelize.authenticate()
.then(()=>{
    console.log('connected..')
})
.catch(err=>{
    console.log('error'+err)
})


const db ={}

db.Sequelize=Sequelize
db.sequelize=sequelize


db.configs=require('./ConfigModel.js')(sequelize,DataTypes)
db.courses=require('./CourseModel.js')(sequelize,DataTypes)
db.exams=require('./ExamModel.js')(sequelize,DataTypes)
db.teachers=require('./TeacherModel.js')(sequelize,DataTypes)
db.questions=require('./QuestionsModel.js')(sequelize,DataTypes)
db.students=require('./StudentModel.js')(sequelize,DataTypes)
db.studies=require('./StudyModel.js')(sequelize,DataTypes)

const Course = db.courses;
const Teacher = db.teachers;
const Exam = db.exams;
const Question = db.questions

Teacher.belongsToMany(Course, {through: 'CourseTeachers'});
Course.belongsToMany(Teacher, {through: 'CourseTeachers'});

Question.belongsToMany(Exam, {through: 'ExamQuestions'});
Exam.belongsToMany(Question, {through: 'ExamQuestions'});

Teacher.hasMany(Exam, {
    foreignKey: 'teacherid',
    as: 'exams'
});

Exam.belongsTo(Teacher, {
    foreignKey: 'teacherid'
});

db.sequelize.sync({force:0}) 
.then(()=>{
    console.log('yes re-sync ddone!')
}) 

module.exports=db;