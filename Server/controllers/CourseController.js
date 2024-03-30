const db = require('../models');
var jwt = require('jsonwebtoken');

// Create main Model
const Course = db.courses;

// Main work

// 1. Create Course
const addCourse = async (req, res) => {
    try {
        const info = {
            name: req.body.name,
            active: req.body.active ? req.body.active : false,
            description: req.body.description,
            image: req.body.image,
            unit: req.body.unit,
        };
        const course = await Course.create(info);
        res.status(200).send(course);
    } catch (error) {
        res.status(400).json({ error: 'Internal server error' });
    }
};

// 2. Get all Course
// const getAllCourse = async (req, res) => {
//     try {
//         let courses = await Course.findAll({});
//         jwt.verify(req.token, "loginkey", (err, authData) => {
//             if (err) {
//               res.sendStatus(403);
//             } else {
//               res.status(200).json({
//                 courses,
//                 authData
//               });
//             }
//           });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };
const getAllCourse = async (req, res) => {
    try {
        let courses = await Course.findAll({});
        res.status(200).json({
            courses,
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 3. Get single Course
const getOneCourse = async (req, res) => {
    try {
        let id = req.params.id;
        let courses = await Course.findOne({ where: { id: id }, include: [db.teachers]  });
        if (!courses) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).send(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 4. Update Course
const updateCourse = async (req, res) => {
    try {
        let id = req.params.id;
        const course = await Course.update(req.body, { where: { id: id } });
        if (course[0] === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).send(course);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 5. Delete Course by id
const deleteCourse = async (req, res) => {
    try {
        let id = req.params.id;
        const deletedCourseCount = await Course.destroy({ where: { id: id } });
        if (deletedCourseCount === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).send('Course is deleted');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 6. Get published Course
const getPublishedCourse = async (req, res) => {
    try {
        const courses = await Course.findAll({ where: { active: true } });
        res.status(200).send(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addTeacher = async (req, res) => {
    const course = await Course.findOne({where: {id: req.body.courseId},});
    course.addTeachers(req.body.teachers);
}

const removeTeacher = async (req, res) => {
    let courseId = req.body.courseId;
    let teacherId = req.body.teacherId;
    Course.findByPk(courseId).then(course => {
        if (course) {
          course.removeTeachers(teacherId).then(() => {
            res.status(200).json({ error: 'Teacher removed from the course successfully' });
          }).catch(err => {
            console.error('Error:', err);
          });
        } else {
          console.log('Course not found');
        }
      }).catch(err => {
        res.status(500).json({ error: 'Internal server error' });
      });
}

module.exports = {
    addCourse,
    getAllCourse,
    getOneCourse,
    updateCourse,
    deleteCourse,
    getPublishedCourse,
    addTeacher,
    removeTeacher
};