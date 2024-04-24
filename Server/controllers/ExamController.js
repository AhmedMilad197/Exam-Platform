const db = require('../models');
const moment = require('moment-timezone');

// Create main Model
const Exam = db.exams;

// Main work

// 1. Create Exam
const addExam = async (req, res) => {
    try {
        let startDateTime = moment(req.body.start_time, 'YYYY-MM-DD HH:mm:ss').toDate();
        let endDateTime = moment(req.body.end_time, 'YYYY-MM-DD HH:mm:ss').toDate();

        startDateTime.setHours(startDateTime.getHours() + 2);
        endDateTime.setHours(endDateTime.getHours() + 2);

        let info = {
            start_time: startDateTime,
            end_time: endDateTime,
            name: req.body.title,
            description: req.body.description,
            full_mark: 100,
            teacherid: req.body.teacherId,
            courseid: req.body.courseId
        };
        const exam = await Exam.create(info);
        res.status(200).send(exam);
        exam.setQuestions(req.body.questions)
        res.status(201);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 2. Get all Exam
const getAllExam = async (req, res) => {
    const Teachers = db.teachers;
    try {
        let exams = await Exam.findAll({
            include: Teachers
        });
        res.status(200).send(exams);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 3. Get single Exam
const getOneExam = async (req, res) => {
    try {
        let id = req.body.data.examId;
        let studentId = req.body.data.studentId
        let exams = await Exam.findOne({
            where: { id: id },
            include: [
              {
                model: db.questions,
                as: 'questions',
                include: [
                  {
                    model: db.studentexamhistory,
                    as: 'studentexamhistory',
                    where: {
                      studentid: studentId,
                      examid: id
                    },
                    required: false // This ensures that only questions with matching studentexamhistory records are included
                  }
                ]
              }
            ]
          });
        res.status(200).send(exams);
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

const viewExam = async (req, res) => {
    try {
        let id = req.body.data.examId;
        let exams = await Exam.findOne({where: { id: id }, include: [db.questions]});
        res.status(200).send(exams);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    addExam,
    getAllExam,
    getOneExam,
    deleteExam,
    viewExam
};