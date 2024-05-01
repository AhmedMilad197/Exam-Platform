const{DataTypes}=require("sequelize");

const {sequelize}=require(".");

module.exports=(sequelize,DataTypes)=>{
    const Course =sequelize.define("Course", {
        name : {
            type:DataTypes.STRING(50),
            allowNull:false
        },
        description:{
            type :DataTypes.STRING(50)
        },
        unit:{
            type:DataTypes.INTEGER
        }
    })
    return Course  
}