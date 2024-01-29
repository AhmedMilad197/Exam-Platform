const{DataTypes}=require("sequelize");

const {sequelize}=require(".");

module.exports=(sequelize,DataTypes)=>{
    const Study =sequelize.define("study", {
        teacherid :{
            type:DataTypes.INTEGER,
            onDelete: 'RESTRICT',
            references: {
                 model: 'teachers',
                 key: 'id',
                        }
        



                    },

        coursid : {
            type:DataTypes.INTEGER,
            onDelete: 'RESTRICT',
            references: {
                model: 'courses',
                key: 'id',
                        }
                    },
                  
                  
        studentid : {
            type:DataTypes.INTEGER,
            nDelete: 'RESTRICT',
            references: {
                model: 'students',
                key: 'id',
                        }
                    }

        
    })
    return Study  
}