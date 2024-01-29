const{DataTypes}=require("sequelize");

const {sequelize}=require(".");

module.exports=(sequelize,DataTypes)=>{
    const Config =sequelize.define("config", {
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
        active:{
            type:DataTypes.BOOLEAN
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