const db = require('../models');

const ExamStudent = db.examStudent;

const create = async (req, res) => {
    try {
        const course = await ExamStudent.create(req.body);
        res.status(200).send(course);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    create,
};