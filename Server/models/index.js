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

db.sequelize.sync({force:false})
.then(()=>{
    console.log('yes re-sync ddone!')
})

module.exports=db;