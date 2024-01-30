const CourseController = require('../controllers/CourseController')

const Courserouter = require('express').Router()



Courserouter.post('/create',CourseController.addCourse)

Courserouter.get('/allCourse',CourseController.getAllCourse)

Courserouter.get('/published',CourseController.getPublishedCourse)




Courserouter.get('/:id',CourseController.getOneCourse)

Courserouter.put('/:id',CourseController.updateCourse)

Courserouter.delete('/:id',CourseController.deleteCourse)

module.exports=Courserouter