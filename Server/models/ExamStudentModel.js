const{DataTypes}=require("sequelize");
const {sequelize}=require(".");

module.exports=(sequelize,DataTypes)=>{
    const ExamStudent = sequelize.define("examstudent", {
        score:{
            type:DataTypes.INTEGER
        }
    })
    return ExamStudent
}