const{DataTypes}=require("sequelize");

const {sequelize}=require(".");

module.exports=(sequelize,DataTypes)=>{
    const  Question =sequelize.define("questions", {
        courseid  : {
            type:DataTypes.INTEGER,
            onDelete: 'RESTRICT',
            references: {
                 model: 'courses',
                 key: 'id',
                        }
        },
        teacherid:{
            type:DataTypes.INTEGER,
            onDelete: 'RESTRICT',
            references: {
                 model: 'teachers',
                 key: 'id',
                        }
        },
        content:{
            type:DataTypes.STRING(100)
        },
        answer1:{
            type:DataTypes.STRING(100)
        },
        answer2:{
            type:DataTypes.STRING(100)
        },
        answer3:{
            type:DataTypes.STRING(100)
        },
        answer4:{
            type:DataTypes.STRING(100)
        },
        rightanswer:{
            type:DataTypes.INTEGER
        },
        mark:{
            type:DataTypes.INTEGER
        },
    })

    // Defining relationships.
    const teacher = require('./TeacherModel')(sequelize, DataTypes);
    teacher.hasMany(Question, {
        foreignKey: 'teacherid',
        as: 'exams'
    });
    Question.belongsTo(teacher, {
        foreignKey: 'teacherid'
    });
    return Question  
}