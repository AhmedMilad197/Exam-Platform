const db = require('../models');

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
        res.status(200).send(teacher);
        console.log(teacher);
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

module.exports = {
    addTeacher,
    getAllTeacher,
    getOneTeacher,
    updateTeacher,
    deleteTeacher,
    getPublishedTeacher,
};