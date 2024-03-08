const db = require('../models');
var jwt = require('jsonwebtoken');

// Create main Model
const Teacher = db.teachers;
// Main work

// 1. Create Teacher
const addTeacher = async (req, res) => {
    try {
        let info = {
            name: req.body.name,
            username: req.body.username,
            nameadmin: req.body.nameadmin,
            password: req.body.password,
            image: req.body.image,
            specialist: req.body.specialist,
            lastlogin: req.body.lastlogin,
            active: req.body.active ? req.body.active : false,
        };
        const teacher = await Teacher.create(info);
        if (teacher != null) {
            jwt.sign({
                user: info,
                exp: Math.floor(Date.now() / 1000) + (60 * 60) // expires in one hour.
            }, 'loginkey', (err, token) => {
                res.send({
                    teacher: teacher,
                    token: token
                });
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 2. Get all Teacher
const getAllTeacher = async (req, res) => {
    try {
        let teachers = await Teacher.findAll({});
        res.status(200).send(teachers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 3. Get single Teacher
const getOneTeacher = async (req, res) => {
    try {
        let id = req.params.id;
        let teachers = await Teacher.findOne({ where: { id: id } });
        if (!teachers) {
            return res.status(404).json({ error: 'Teacher not found' });
        }
        res.status(200).send(teachers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 4. Update Teacher
const updateTeacher = async (req, res) => {
    try {
        let id = req.params.id;
        const teacher = await Teacher.update(req.body, { where: { id: id } });
        if (teacher[0] === 0) {
            return res.status(404).json({ error: 'Teacher not found' });
        }
        res.status(200).send(teacher);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 5. Delete Teacher by id
const deleteTeacher = async (req, res) => {
    try {
        let id = req.params.id;
        const deletedTeacherCount = await Teacher.destroy({ where: { id: id } });
        if (deletedTeacherCount === 0) {
            return res.status(404).json({ error: 'Teacher not found' });
        }
        res.status(200).send('Teacher is deleted');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 6. Get published Teacher
const getPublishedTeacher= async (req, res) => {
    try {
        const teacher = await Teacher.findAll({ where: { active: true } });
        res.status(200).send(teacher);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 7. Teacher login
const login = async (req, res) => {
    const username = req.body.username;
    let teacher = await Teacher.findOne({ where: { username: username } });
    if (teacher != null) {
        if (teacher.password == req.body.password) {
            jwt.sign({
                user: req.body,
                exp: Math.floor(Date.now() / 1000) + (60 * 60) // expires in one hour.
            }, 'loginkey', (err, token) => {
                res.send({
                    teacher: teacher,
                    token: token
                });
            });
        }
    }
}

const availableTeachers = async (req, res) => {
    const currentCourseId = req.body.courseId;
    // const Sequelize = require('sequelize');
    const Op = db.Sequelize.Op;
    const { QueryTypes } = require('sequelize');
    const availableTeachers = await db.sequelize.query(
        'SELECT teacherId FROM courseteachers WHERE courseId = :id',
        {
          replacements: { id: currentCourseId },
          type: QueryTypes.SELECT
        }
      );
    console.log(availableTeachers.map(obj => obj.teacherId));
    const teachersNotInCurrentCourse = await Teacher.findAll({
        where: {
          id: {
            [Op.notIn]: availableTeachers.map(obj => obj.teacherId)
          }
        }
      });
    res.send(teachersNotInCurrentCourse);
}

const getStudents = async (req, res) => {
    const Student = db.students;
    const courseId = req.body.subject;
    const teacherId = req.body.teacherId;
    const Op = db.Sequelize.Op;
    const { QueryTypes } = require('sequelize');
    const availableStudents = await db.sequelize.query(
        'SELECT studentid FROM studies WHERE coursid = :id and teacherid = :teacherId',
        {
          replacements: { 
            id: courseId,
            teacherId: teacherId
         },
          type: QueryTypes.SELECT
        }
      );
    const studentsInCurrentCourse = await Student.findAll({
        where: {
          id: {
            [Op.in]: availableStudents.map(obj => obj.studentid)
          }
        }
      });
    res.send(studentsInCurrentCourse);
}

const getQuestions = async(req, res) => {
    const Question = db.questions
    const questions = await Question.findAll({
        where: {
          teacherid: req.body.teacherId
        }
      });
    res.send(questions);
}

const getExams = async (req, res) => {
    let teacher = await Teacher.findOne({
        where: { 
            id: req.body.teacherId 
        }, include: { 
            model: db.exams, 
            as: 'exams',
            where: { 
                courseid: req.body.courseId 
            }
        } });
    if (teacher != null) {
        res.send(teacher.exams)
    } else {
        res.send({})
    }
} 

module.exports = {
    addTeacher,
    getAllTeacher,
    getOneTeacher,
    updateTeacher,
    deleteTeacher,
    getPublishedTeacher,
    login,
    availableTeachers,
    getStudents,
    getQuestions,
    getExams,
};
