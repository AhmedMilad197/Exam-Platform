const CourseController = require('../controllers/CourseController')

const Courserouter = require('express').Router()

const verifyToken = (req, res, next) => {
  // const bearerHeader = req.headers['authorization'];
  // if (typeof bearerHeader !== 'undifined') {
  //     const bearerToken = bearerHeader.split(' ')[1];
  //     req.token = bearerToken;
  //     next();
  // } else {
  //     res.sendStatus(403);
  // }
}

Courserouter.post('/addCourse', CourseController.addCourse)

Courserouter.post('/addTeacher', CourseController.addTeacher)

Courserouter.get('/allCourse', CourseController.getAllCourse)

Courserouter.post('/teacher/remove', CourseController.removeTeacher)

Courserouter.get('/:id', CourseController.getOneCourse)

Courserouter.put('/:id', CourseController.updateCourse)

Courserouter.delete('/:id', CourseController.deleteCourse)

module.exports=Courserouter