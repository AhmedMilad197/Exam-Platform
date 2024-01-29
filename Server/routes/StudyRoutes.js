const StudyController = require('../controllers/StudyController')

const Studyrouter = require('express').Router()



Studyrouter.post('/addStudy',StudyController.addStudy)

Studyrouter.get('/allStudy',StudyController.getAllStudy)

Studyrouter.get('/:id',StudyController.getOneStudy)

Studyrouter.put('/:id',StudyController.updateStudy)

Studyrouter.delete('/:id',StudyController.deleteStudy)

module.exports=Studyrouter