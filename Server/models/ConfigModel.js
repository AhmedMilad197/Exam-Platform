const{DataTypes}=require("sequelize");

const {sequelize}=require(".");

module.exports=(sequelize,DataTypes)=>{
    const Config =sequelize.define("config", {
        name : {
            type:DataTypes.STRING(50),
            allowNull:false
        },
        email:{
            type:DataTypes.STRING(70)
        },
        nameadmin:{
            type :DataTypes.STRING(50)
        },
        password:{
            type:DataTypes.STRING(10)
        },
        goals:{
            type:DataTypes.STRING
        },
        vision:{
            type:DataTypes.STRING
        },
        faccbook:{
            type:DataTypes.STRING(70)
        },
        phone:{
            type:DataTypes.STRING(15)
        },
        address:{
            type:DataTypes.STRING(70)
        },
    })
    return Config  
}