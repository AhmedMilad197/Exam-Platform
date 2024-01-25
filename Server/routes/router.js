const express=require('express');
//const UserController=require("../controllers/UserController");
const ConfigController=require("../controllers/ConfigController");
const CoursController=require("../controllers/CoursController");
const TeacherController=require("../controllers/TeacherController");
const ExamController=require("../controllers/ExamController");
const QuationsController=require("../controllers/QuationsController");
const StudentController=require("../controllers/StudentController");
const StadyController=require("../controllers/StadyController");



const router =require('express').Router();
const {check}=require("express-validator")


router.get("/",(req,res,next)=>{
    res.send("ritajjjjjj");
});


/*router.get("/user",UserController.getalluser);
*router.post("/adduser",UserController.adduser);
*router.delete("/deleteuser",[check("id").exists().withMessage("id is required").isNumeric().withMessage("id should be only number")],UserController.deleteuser);
*router.post("/updateuser",UserController.updateuser);
*/


//config;

router.get("/config",ConfigController.getallconfig);
router.post("/addconfig",ConfigController.addconfig);
router.delete("/deleteconfig",[check("id").exists().withMessage("id is required").isNumeric().withMessage("id should be only number")],ConfigController.deleteconfig);
router.put("/updateconfig",ConfigController.updateconfig);



//Teacher;

router.get("/teacher",TeacherController.getallteacher);
router.post("/addteacher",TeacherController.addteacher);
router.delete("/deleteteacher",[check("id").exists().withMessage("id is required").isNumeric().withMessage("id should be only number")],TeacherController.deleteteacher);
router.put("/updateteacher",TeacherController.updateteacher);

//cours;

router.get("/cours",CoursController.getallcours);
router.post("/addcours",CoursController.addcours);
router.delete("/deletecours",[check("id").exists().withMessage("id is required").isNumeric().withMessage("id should be only number")],CoursController.deletecours);
router.put("/updatecours",CoursController.updatecours);

//exam;

router.get("/exam",ExamController.getallexam);
router.post("/addexam",ExamController.addexam);
router.delete("/deleteexam",[check("id").exists().withMessage("id is required").isNumeric().withMessage("id should be only number")],ExamController.deleteexam);
router.put("/updateexam",ExamController.updateexam);


//quations;

router.get("/quations",QuationsController.getallquations);
router.post("/addquations",QuationsController.addquations);
router.delete("/deletequations",[check("id").exists().withMessage("id is required").isNumeric().withMessage("id should be only number")],QuationsController.deletequations);
router.put("/updatequations",QuationsController.updatequations);


//student;

router.get("/student",StudentController.getallstudent);
router.post("/addstudent",StudentController.addstudent);
router.delete("/deletestudent",[check("id").exists().withMessage("id is required").isNumeric().withMessage("id should be only number")],StudentController.deletestudent);
router.put("/updatestudent",StudentController.updatestudent);


//stady;

router.get("/stady",StadyController.getallstady);
router.post("/addstady",StadyController.addstady);
router.delete("/deletestady",[check("id").exists().withMessage("id is required").isNumeric().withMessage("id should be only number")],StadyController.deletestady);
router.put("/updateqstady",StadyController.updatestady);



module.exports=router;