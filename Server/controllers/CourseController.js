const db = require('../models');

// Create main Model
const Course = db.courses;

// Main work

// 1. Create Course
const addCourse = async (req, res) => {
    try {
        let info = {
            name: req.body.name,
            active: req.body.active ? req.body.active : false,
            description: req.body.description,
            image: req.body.image,
            unit: req.body.unit,
        
        };
        const course = await Course.create(info);
        res.status(200).send(course);
        console.log(course);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 2. Get all Course
const getAllCourse = async (req, res) => {
    try {
        let courses = await Course.findAll({});
        res.status(200).send(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 3. Get single Course
const getOneCourse = async (req, res) => {
    try {
        let id = req.params.id;
        let courses = await Course.findOne({ where: { id: id } });
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

module.exports = {
    addCourse,
    getAllCourse,
    getOneCourse,
    updateCourse,
    deleteCourse,
    getPublishedCourse,
};