const{DataTypes}=require("sequelize");

const {sequelize}=require(".");

module.exports=(sequelize,DataTypes)=>{
    const Teacher =sequelize.define("Teacher", {
        name : {
            type:DataTypes.STRING,
            allowNull:false
        },
        username:{
            type:DataTypes.STRING,
            unique: true,

        },
        email:{
            type :DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password:{
            type:DataTypes.STRING
        },
        image:{
            type:DataTypes.STRING
        },
        specialist:{
            type:DataTypes.STRING
        },
        lastlogin:{
            type:DataTypes.DATE
        },
        active:{
            type:DataTypes.BOOLEAN
        },
    })
    return Teacher   
}