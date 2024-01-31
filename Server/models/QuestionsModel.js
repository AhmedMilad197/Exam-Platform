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
        type:{
            type :DataTypes.INTEGER
        },
        content:{
            type:DataTypes.STRING
        },
        answer1:{
            type:DataTypes.STRING
        },
        answer2:{
            type:DataTypes.STRING
        },
        answer3:{
            type:DataTypes.STRING
        },
        answer4:{
            type:DataTypes.STRING
        },
        rightanswer:{
            type:DataTypes.INTEGER
        },
        active:{
            type:DataTypes.BOOLEAN
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