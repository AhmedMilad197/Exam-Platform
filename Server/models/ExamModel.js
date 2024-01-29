const{DataTypes}=require("sequelize");

const {sequelize}=require(".");

module.exports=(sequelize,DataTypes)=>{
    const Exam =sequelize.define("exam", {
        start_time : {
            type:DataTypes.DATE,
        
        },
        end_time:{
            type:DataTypes.DATE
        },
        name:{
            type :DataTypes.STRING
        },
        full_mark:{
            type:DataTypes.INTEGER
        },
        teacherid :{
            type:DataTypes.INTEGER,
            onDelete: 'RESTRICT',
            references: {
                 model: 'teachers',
                 key: 'id',
                        }
        }
        
    })
    return Exam  
}