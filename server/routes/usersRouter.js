const express = require("express");
const {registerUser, authUser} = require("../controllers/userController");
const {attendanceSheet} = require("../controllers/attendanceController");
const {classesData, fetchClasses,deleteClass} = require("../controllers/classesController");
const {studentsDataHandler,fetchStudents} = require("../controllers/studentsController");

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(authUser);
router.route('/schooldata').post(attendanceSheet);
router.route('/classes').post(classesData);
router.route('/students').post(studentsDataHandler);
router.route('/students').get(fetchStudents);
router.route('/classes').get(fetchClasses);
router.route('/delete').delete(deleteClass);
module.exports=router;
