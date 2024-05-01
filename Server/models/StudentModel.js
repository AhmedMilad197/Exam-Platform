const{DataTypes}=require("sequelize");

const {sequelize}=require(".");

module.exports=(sequelize,DataTypes)=>{
    const Student =sequelize.define("student", {
        name : {
            type:DataTypes.STRING(50),
            allowNull:false
        },
        father_name : {
            type:DataTypes.STRING(50),
            allowNull:true
        },
        grandfather_name : {
            type:DataTypes.STRING(50),
            allowNull:true
        },
        last_name : {
            type:DataTypes.STRING(50),
            allowNull:true
        },
        username:{
            type:DataTypes.STRING(50)
        },
        password:{
            type :DataTypes.STRING(10)
        },
        phone:{
            type:DataTypes.STRING(15)
        },
        address:{
            type:DataTypes.STRING(50)
        }
        
    })
    return Student  
}