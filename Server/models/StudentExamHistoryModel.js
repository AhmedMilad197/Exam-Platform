const{DataTypes}=require("sequelize");

const {sequelize}=require(".");

module.exports=(sequelize,DataTypes)=>{
    const Study =sequelize.define("student_exam_history", {
        studentid :{
            type:DataTypes.INTEGER,
            onDelete: 'RESTRICT',
            references: {
                 model: 'students',
                 key: 'id',
            }
        },
        examid : {
            type:DataTypes.INTEGER,
            onDelete: 'RESTRICT',
            references: {
                model: 'exams',
                key: 'id',
            }
        },
                  
        questionid : {
            type:DataTypes.INTEGER,
            onDelete: 'RESTRICT',
            references: {
                model: 'questions',
                key: 'id',
            }
        },

        student_answer : {
            type:DataTypes.INTEGER,
        },
    })
    return Study  
}