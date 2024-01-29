const QuestionController = require('../controllers/QuestionController.js')

const Questionrouter = require('express').Router()



Questionrouter.post('/addQuestion',QuestionController.addQuestion)

Questionrouter.get('/allQuestion',QuestionController.getAllQuestion)

Questionrouter.get('/published',QuestionController.getPublishedQuestion)




Questionrouter.get('/:id',QuestionController.getOneQuestion)

Questionrouter.put('/:id',QuestionController.updateQuestion)

Questionrouter.delete('/:id',QuestionController.deleteQuestion)

module.exports=Questionrouter