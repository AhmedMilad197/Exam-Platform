const db = require('../models');
// Create main Model
const Question = db.questions;

// Main work

// 1. Create Question
const addQuestion = async (req, res) => {
    try {
        let info = {
            courseid: req.body.courseid,
            teacherid: req.body.teacherid,
            content: req.body.content,
            answer1: req.body.answer1,
            answer2: req.body.answer2,
            answer3: req.body.answer3,
            answer4: req.body.answer4,
            rightanswer: req.body.rightanswer,
            mark: req.body.mark,
        };

        const question = await Question.create(info);
        res.status(200).send(question);
        console.log(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 2. Get all Question
const getAllQuestion = async (req, res) => {
    try {
        let questions = await Question.findAll({
            include: db.teachers
        });
        res.status(200).send(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 3. Get single Question
const getOneQuestion = async (req, res) => {
    try {
        let id = req.params.id;
        let questions = await Question.findOne({ where: { id: id } });
        if (!questions) {
            return res.status(404).json({ error: 'id not found' });
        }
        res.status(200).send(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 4. Update Question
const updateQuestion = async (req, res) => {
    try {
        let id = req.params.id;
        const question = await Question.update(req.body, { where: { id: id } });
        if (question[0] === 0) {
            return res.status(404).json({ error: 'Question not found' });
        }
        res.status(200).send(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 5. Delete Question by id
const deleteQuestion = async (req, res) => {
    try {
        let id = req.params.id;
        const deletedQuestionCount = await  Question.destroy({ where: { id: id } });
        if (deletedQuestionCount === 0) {
            return res.status(404).json({ error: 'Question not found' });
        }
        res.status(200).send('Question is deleted');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 6. Get published Question
const getPublishedQuestion = async (req, res) => {
    try {
        const questions = await Question.findAll({ where: { active: true } });
        res.status(200).send(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getTeacherQuestions = async (req, res) => {
    try {
        const questions = await Question.findAll({ where: { 
            teacherId: req.body.teacherId,
            courseId: req.body.courseId
        } });
        console.log(questions)
        res.status(200).send(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    addQuestion,
    getAllQuestion,
    getOneQuestion,
    updateQuestion,
    deleteQuestion,
    getPublishedQuestion,
    getTeacherQuestions
};