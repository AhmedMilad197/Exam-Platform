const{DataTypes}=require("sequelize");

const {sequelize}=require(".");

module.exports=(sequelize,DataTypes)=>{
    const Config =sequelize.define("configs", {
        name : {
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING
        },
        nameadmin:{
            type :DataTypes.STRING
        },
        password:{
            type:DataTypes.STRING
        },
        goals:{
            type:DataTypes.STRING
        },
        vision:{
            type:DataTypes.STRING
        },
        faccbook:{
            type:DataTypes.STRING
        },
        phone:{
            type:DataTypes.STRING
        },
        address:{
            type:DataTypes.STRING
        },
    })
    return Config  
}