const db = require('../models');
var jwt = require('jsonwebtoken');

// Create main Model
const Student = db.students;


// Main work

// 1. Create Student
const addStudent = async (req, res) => {
    try {
        let info = {
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            phone: req.body.phone,
            address: req.body.address,
        };
        const student = await Student.create(info);
        res.status(200).send(student);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 2. Get all Student
const getAllStudent = async (req, res) => {
    try {
        let students = await Student.findAll({});
        res.status(200).send(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 3. Get single Student
const getOneStudent = async (req, res) => {
    try {
        let id = req.params.id;
        let students = await Student.findOne({ where: { id: id } });
        if (!students) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).send(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 4. Update Student
const updateStudent = async (req, res) => {
    try {
        console.log(req.body)
        let id = req.params.id;
        const student = await Student.update(req.body, { where: { id: id } });
        if (student[0] === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).send(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 5. Delete Student by id
const deleteStudent = async (req, res) => {
    try {
        let id = req.params.id;
        const deletedStudentCount = await Student.destroy({ where: { id: id } });
        if (deletedStudentCount === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).send('Student is deleted');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
  
// 6. Student Login
const login = async (req, res) => {
    try {
      const username = req.body.username;
      let student = await Student.findOne({ where: { username: username } });
      if (student != null) {
          if (student.password == req.body.password) {
              jwt.sign({
                  user: student,
                  role: 'student',
                  exp: Math.floor(Date.now() / 1000) + (60 * 60) // expires in one hour.
              }, 'loginkey', (err, token) => {
                  res.send({
                      student: student,
                      token: token,
                      role: 'student'
                  });
              });
          }
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
}

const availableStudents = async (req, res) => {
    const courseId = req.params.courseId;
    const Op = db.Sequelize.Op;
    const { QueryTypes } = require('sequelize');
    const availableStudents = await db.sequelize.query(
        'SELECT studentid FROM studies WHERE coursid = :id',
        {
          replacements: { id: courseId },
          type: QueryTypes.SELECT
        }
      );
    const studentsNotInCurrentCourse = await Student.findAll({
        where: {
          id: {
            [Op.notIn]: availableStudents.map(obj => obj.studentid)
          }
        }
      });
    res.send(studentsNotInCurrentCourse);
}

const exams = async (req, res) => {
    const Exam = db.exams;
    const studentId = req.body.studentId;
    const courseId = req.body.courseId;
    const Op = db.Sequelize.Op;
    const { QueryTypes } = require('sequelize');
  
    // Check if studentId is provided
    if (!studentId) {
      res.status(400).send('Missing studentId');
      return;
    }
  
    try {
      const teachers = await db.sequelize.query(
        'SELECT teacherid FROM studies WHERE studentid = :id AND coursid = :courseId',
        {
          replacements: { id: studentId, courseId: courseId },
          type: QueryTypes.SELECT
        }
      );
  
      const studentExams = await Exam.findAll({
        where: {
          teacherid: {
            [Op.in]: teachers.map(obj => obj.teacherid)
          },
          courseid: {
            [Op.eq]: courseId
          }
        },
        include: [{
          model: db.examStudent,
          where: {
            studentId: studentId
          },
          required: false
        }]
      });
  
      res.send(studentExams);
    } catch (error) {
        res.status(500).send('Internal server error');
    }
};

const courses = async (req, res) => {
    const Courses = db.courses;
    const studentId = req.body.studentId;
    const Op = db.Sequelize.Op;
    const { QueryTypes } = require('sequelize');
  
    // Check if studentId is provided
    if (!studentId) {
      res.status(400).send('Missing studentId');
      return;
    }
  
    try {
      const courseIds = await db.sequelize.query(
        'SELECT coursid FROM studies WHERE studentid = :id',
        {
          replacements: { id: studentId },
          type: QueryTypes.SELECT
        }
      );
  
      const studentCourses = await Courses.findAll({
        where: {
          id: {
            [Op.in]: courseIds.map(obj => obj.coursid)
          }
        }
      });

      res.send(studentCourses);
    } catch (error) {
        res.status(500).send('Internal server error');
    }
}

module.exports = {
    addStudent,
    getAllStudent,
    getOneStudent,
    updateStudent,
    deleteStudent,
    login,
    availableStudents,
    exams,
    courses
};