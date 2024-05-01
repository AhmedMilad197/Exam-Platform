const{DataTypes}=require("sequelize");

const {sequelize}=require(".");

module.exports=(sequelize,DataTypes)=>{
    const Teacher =sequelize.define("Teacher", {
        name : {
            type:DataTypes.STRING(50),
            allowNull:false
        },
        username:{
            type:DataTypes.STRING(50),
            unique: true,

        },
        email:{
            type :DataTypes.STRING(50),
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password:{
            type:DataTypes.STRING(10)
        },
        specialist:{
            type:DataTypes.STRING(50)
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