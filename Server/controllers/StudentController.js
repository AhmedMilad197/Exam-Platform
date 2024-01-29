const db = require('../models');

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
        console.log(student);
    } catch (error) {
        console.error(error);
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



module.exports = {
    addStudent,
    getAllStudent,
    getOneStudent,
    updateStudent,
    deleteStudent
    
};