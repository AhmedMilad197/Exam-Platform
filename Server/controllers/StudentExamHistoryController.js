const db = require('../models');

const StudentExamHistory = db.studentexamhistory;

const create = async (req, res) => {
    try {
        const examId = req.body.examId;
        const studentId = req.body.studentId;
        const history = req.body.history;
        const keys = Object.keys(history);
        keys.forEach( async (index) => {
            const studentExamHistory = await StudentExamHistory.create({
                studentid: studentId,
                examid: examId,
                questionid: index,
                student_answer: history[index]
            });
        });
    res.status(200).send('Student History Added.');
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    create
};
