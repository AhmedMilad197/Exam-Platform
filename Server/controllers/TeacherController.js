const db = require('../models');
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const NodeCache = require('node-cache');
const cache = new NodeCache();

// Create main Model
const Teacher = db.teachers;
// Main work

// 1. Create Teacher
const addTeacher = async (req, res) => {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 2);
    try {
        let info = {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            image: req.body.image,
            specialist: req.body.specialist,
            lastlogin: currentDate,
            active: req.body.active ? req.body.active : false,
        };
        const teacher = await Teacher.create(info);
        if (teacher != null) {
            jwt.sign({
                user: teacher,
                role: 'teacher',
                exp: Math.floor(Date.now() / 1000) + (60 * 60) // expires in one hour.
            }, 'loginkey', (err, token) => {
                res.send({
                    teacher: teacher,
                    token: token,
                    role: 'teacher'
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
                user: teacher,
                role: 'teacher',
                exp: Math.floor(Date.now() / 1000) + (60 * 60) // expires in one hour.
            }, 'loginkey', (err, token) => {
                res.send({
                    teacher: teacher,
                    token: token,
                    role: 'teacher'
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

const getCourseQuestions = async(req, res) => {
    console.log(req.body)
    const Question = db.questions
    const questions = await Question.findAll({
        where: {
          teacherid: req.body.teacherId,
          courseid: req.body.couresId
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
        res.send(teacher)
    } else {
        res.send({})
    }
}

const block = async (req, res) => {
    try {
        const id = req.body.teacherId;
        const teacher = await Teacher.update({ active : false }, { where: { id: id } });
        if (teacher[0] === 0) {
            return res.status(404).json({ error: 'Teacher not found' });
        }
        res.status(200).send(teacher);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
} 

const unBlock = async (req, res) => {
    try {
        const id = req.body.teacherId;
        const teacher = await Teacher.update({ active : true }, { where: { id: id } });
        if (teacher[0] === 0) {
            return res.status(404).json({ error: 'Teacher not found' });
        }
        res.status(200).send(teacher);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
} 

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    
    return randomString;
  }
  

const sendPassword = async (req, res) => {
    const verificationCode = generateRandomString(8);
    const email = req.body.email;
    let teacher = await Teacher.findOne({ where: { email: email } });
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'examplatform8@gmail.com',
            pass: 'rwyk rkmg kjqv wwyj'
        }
    });

    const mailOptions = {
        from: 'examplatform8@gmail.com',
        to: email,
        subject: 'Exam Platform',
        text: `Your Exam Platform verification code is ${verificationCode}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).json({ 
                error: 'Internal server error',
                message: error.message
            });
        } else {
            const key = 'OTPCode';
            const value = {
                email: email,
                verification_code: verificationCode
            };
            const ttl = 10000;
            cache.set(key, value, ttl);
            console.log(cache.get(key));
            res.status(200).json({
                message: 'Email Sent',
                verification_code: verificationCode 
            })
        }
    });
}

const removeStudent = async (req, res) => {
    try {
        await db.studies.destroy({
            where: {
                studentid: req.body.studentId,
                coursid: req.body.courseId,
                teacherid: req.body.teacherId,
            },
        });
        res.status(200).send({
            message: 'Student Removed Successfully.'
        });
    } catch (error) {
        res.status(500).json({ 
            message: error.message
        });
    }
} 

const verifyOTP = (req, res) => {
    const key = 'OTPCode';
    const OTPCode = cache.get(key);
    console.log(OTPCode)
    res.send({
        code: req.body.code,
        cached_code: OTPCode
    })
}

const resetPassword = async (req, res) => {
    const newPassword = req.body.new_password;
    const key = 'OTPCode';
    const data = cache.get(key);
    const email = data.email
    let teacher = await Teacher.findOne({ where: { email: email } });

    if (teacher) {
        teacher.password = newPassword;
        await teacher.save();
        jwt.sign({
            user: teacher,
            role: 'teacher',
            exp: Math.floor(Date.now() / 1000) + (60 * 60) // expires in one hour.
        }, 'loginkey', (err, token) => {
            res.send({
                teacher: teacher,
                token: token,
                role: 'teacher'
            });
        });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
}

const TeacherCourses = async (req, res) => {
    let id = req.params.id;
    try {
        let teacher = await Teacher.findOne({ where: { id: id }, include: [db.courses] });
        res.send(teacher)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    addTeacher,
    getAllTeacher,
    getOneTeacher,
    getPublishedTeacher,
    login,
    sendPassword,
    verifyOTP,
    resetPassword,
    availableTeachers,
    getStudents,
    getQuestions,
    getExams,
    block,
    unBlock,
    removeStudent,
    getCourseQuestions,
    TeacherCourses
};
