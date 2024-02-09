const db = require('../models');

// Create main Model
const Study = db.studies;

// Main work

// 1. Create Study

const addOneStudy = async (data) => {
    try {
        let info = {
            teacherid: data.teacherid,
            coursid: data.coursid,
            studentid: data.studentid,
        };
        const study = await Study.create(info);
    } catch (error) {
        console.error(error);
    }
}

const addStudy = async (req, res) => {
    try {
        teacherid = req.body.teacherId;
        coursid = req.body.courseId;
        students = req.body.students;
        students.forEach(studentId => {
            addOneStudy({
                teacherid: teacherid,
                coursid: coursid,
                studentid: studentId,
            })
        });
        res.status(200).send({
            message: 'Students added'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 2. Get all Study
const getAllStudy = async (req, res) => {
    try {
        let studies = await Study.findAll({});
        res.status(200).send(studies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 3. Get single Study
const getOneStudy = async (req, res) => {
    try {
        let id = req.params.id;
        let studies = await Study.findOne({ where: { id: id } });
        if (!studies) {
            return res.status(404).json({ error: 'Study not found' });
        }
        res.status(200).send(studies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 4. Update Study
const updateStudy = async (req, res) => {
    try {
        let id = req.params.id;
        const study = await Study.update(req.body, { where: { id: id } });
        if (study[0] === 0) {
            return res.status(404).json({ error: 'Study not found' });
        }
        res.status(200).send(study);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 5. Delete Study by id
const deleteStudy = async (req, res) => {
    try {
        let id = req.params.id;
        const deletedStudy = await Study.destroy({ where: { id: id } });
        if (deletedStudy === 0) {
            return res.status(404).json({ error: 'Study not found' });
        }
        res.status(200).send('Study is deleted');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = {
    addStudy,
    getAllStudy,
    getOneStudy,
    updateStudy,
    deleteStudy,
};