const db = require('../models');

// Create main Model
const Exam = db.exams;

// Main work

// 1. Create Exam
const addExam = async (req, res) => {
    try {
        let info = {
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            name: req.body.name,
            full_mark: req.body.full_mark,
            teacherid: req.body.teacherid,
        
        };
        const exam = await Exam.create(info);
        res.status(200).send(exam);
        console.log(exam);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 2. Get all Exam
const getAllExam = async (req, res) => {
    try {
        let exams = await Exam.findAll({});
        res.status(200).send(exams);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 3. Get single Exam
const getOneExam = async (req, res) => {
    try {
        let id = req.params.id;
        let exams = await Exam.findOne({ where: { id: id } });
        if (!exams) {
            return res.status(404).json({ error: 'Exam not found' });
        }
        res.status(200).send(exams);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 4. Update Exam
const updateExam = async (req, res) => {
    try {
        let id = req.params.id;
        const exam = await Exam.update(req.body, { where: { id: id } });
        if (exam[0] === 0) {
            return res.status(404).json({ error: 'Exam not found' });
        }
        res.status(200).send(exam);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 5. Delete Exam by id
const deleteExam = async (req, res) => {
    try {
        let id = req.params.id;
        const deletedExam = await Exam.destroy({ where: { id: id } });
        if (deletedExam === 0) {
            return res.status(404).json({ error: 'Exam not found' });
        }
        res.status(200).send('Exam is deleted');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addQuestions = async (req, res) => {
    //
    console.log(req.body)
}

module.exports = {
    addExam,
    getAllExam,
    getOneExam,
    updateExam,
    deleteExam,
    addQuestions
};