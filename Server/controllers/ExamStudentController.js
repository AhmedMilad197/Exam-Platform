const db = require('../models');
const ExcelJS = require('exceljs');
const fs = require('fs');

const ExamStudent = db.examStudent;
const Student = db.students
const Exam = db.exams

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

const storeToExcel = async (req, res) => {
    try {
        const exam_students = await ExamStudent.findAll({
            where: { examId: req.params.id },
            include: [Student]
        });

        const Exam = db.exams;
        const currentExam = await Exam.findOne({
            where: { id: req.params.id },
            include: [db.courses]
        });
        console.log(currentExam);
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Exam Students');

        // Define the columns in the Excel file
        worksheet.columns = [
            { header: 'Student ID', key: 'studentId', width: 10, style: { alignment: { horizontal: 'center' } } },
            { header: 'Student Name', key: 'studentName', width: 20, style: { alignment: { horizontal: 'center' } } },
            { header: 'Student Mark', key: 'mark', width: 20, style: { alignment: { horizontal: 'center' } } },
            // Add more columns as needed
        ];

        // Populate the rows with the data
        exam_students.forEach((exam_student) => {
            worksheet.addRow({
                studentId: exam_student.student.id,
                studentName: exam_student.student.name,
                mark: exam_student.score,
                // Add more data for each column
            });
        });

        let counter = 1;
        let filePath = `${currentExam.Course.name}(${counter}).xlsx`;
        
        // Check if the file already exists
        while (fs.existsSync(filePath)) {
            counter++;
            filePath = `${currentExam.Course.name}(${counter}).xlsx`;
        }

        // Generate the Excel file
        await workbook.xlsx.writeFile(filePath);

        // Send the file as a response
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getScore = async (req, res) => {
    console.log(req.body);
    try {
        const exam_student = await ExamStudent.findOne({
            where: { 
                examId: req.body.examId,
                studentId: req.body.studentId
            },
            include: [Student, Exam]
        });
        res.status(200).send(exam_student);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    create,
    getStudents,
    storeToExcel,
    getScore
};