const db = require('../models');

const ExamStudent = db.examStudent;
const Student = db.students

const create = async (req, res) => {
    try {
        const course = await ExamStudent.create(req.body);
        res.status(200).send(course);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getStudents = async (req, res) => {
    try {
        const exam_student = await ExamStudent.findAll({
            where: { examId: req.params.id },
            include: [Student]
        });
        res.status(200).send(exam_student);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    create,
    getStudents
};