const{DataTypes}=require("sequelize");
const {sequelize}=require(".");

module.exports=(sequelize,DataTypes)=>{
    const Exam = sequelize.define("exam", {
        start_time : {
            type:DataTypes.DATE,
        },
        end_time:{
            type:DataTypes.DATE
        },
        name:{
            type :DataTypes.STRING
        },
        description:{
            type :DataTypes.STRING
        },
        full_mark:{
            type:DataTypes.INTEGER
        },
        teacherid :{
            type:DataTypes.INTEGER,
            onDelete: 'RESTRICT',
        },
        courseid :{
            type:DataTypes.INTEGER,
            onDelete: 'RESTRICT',
        },
    })

    // Defining relationships.
    const teacher = require('./TeacherModel')(sequelize, DataTypes);
    const course = require('./CourseModel')(sequelize, DataTypes);
    teacher.hasMany(Exam, {
        foreignKey: 'teacherid',
        as: 'exams'
    });
    Exam.belongsTo(teacher, {
        foreignKey: 'teacherid'
    });
    course.hasMany(Exam, {
        foreignKey: 'courseid',
        as: 'exams'
    });
    Exam.belongsTo(course, {
        foreignKey: 'courseid'
    });
    return Exam
}