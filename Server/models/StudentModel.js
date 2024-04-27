const{DataTypes}=require("sequelize");

const {sequelize}=require(".");

module.exports=(sequelize,DataTypes)=>{
    const Student =sequelize.define("student", {
        name : {
            type:DataTypes.STRING,
            allowNull:false
        },
        father_name : {
            type:DataTypes.STRING,
            allowNull:true
        },
        grandfather_name : {
            type:DataTypes.STRING,
            allowNull:true
        },
        last_name : {
            type:DataTypes.STRING,
            allowNull:true
        },
        username:{
            type:DataTypes.STRING
        },
        password:{
            type :DataTypes.STRING
        },
        phone:{
            type:DataTypes.STRING
        },
        address:{
            type:DataTypes.STRING
        }
        
    })
    return Student  
}