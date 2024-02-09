const{DataTypes}=require("sequelize");

const {sequelize}=require(".");

module.exports=(sequelize,DataTypes)=>{
    const Course =sequelize.define("Course", {
        name : {
            type:DataTypes.STRING,
            allowNull:false
        },
        active:{
            type:DataTypes.BOOLEAN
        },
        description:{
            type :DataTypes.STRING
        },
        image:{
            type:DataTypes.STRING
        },
        unit:{
            type:DataTypes.INTEGER
        }
    })
    return Course  
}