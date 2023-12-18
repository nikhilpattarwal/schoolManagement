const express = require("express");
const {registerUser, authUser, schoolData, classesData} = require("../controllers/userController");

const router = express.Router();
router.route('/register').post(registerUser);
router.route('/login').post(authUser);
router.route('/schooldata').post(schoolData);
router.route('/classes').post(classesData);


module.exports=router;
