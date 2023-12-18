const User = require("../models/userModel");
const asyncHandler = require('express-async-handler');
const generateToken = require("../utils/generateToken");
const Attendance = require("../models/attendanceData");
const mongoose = require('mongoose');
const Classes = require("../models/classesData");

const registerUser = asyncHandler (async (req,res)=>{
    console.log(req.body);
    const {name, email, password} = req.body.userData;

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(404);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error("Error Occured!");
    }
});

const authUser = asyncHandler(async(req,res)=>{
    console.log(req.body);
  const {email, password} =req.body.userData;
  const user = await User.findOne({email});
  
  if(user && ( await user.matchPassword(password))){
    res.json({
       _id : user._id,
       name: user.name,
       email: user.email,
       token: generateToken(user._id)
    })
  }else{
    res.status(400);
    throw new Error("Invalid email or password!");
}
})


const schoolData = asyncHandler(async(req,res)=>{
   console.log(req.body);
  
    const { dailyAttendance} = req.body;
    const newAttendance = new Attendance({ dailyAttendance});
    newAttendance.save()
    .then(() => {
        console.log("Attendance data saved successfully");
        mongoose.connection.close();
      })
      .catch((error) => {
        console.error("Error saving attendance data:", error);
        mongoose.connection.close();
      });

    
})

const classesData = asyncHandler(async (req, res) => {
    try {
      const { classes } = req.body;
  
      const existingDocument = await Classes.findOne({
        $or: Object.keys(classes).map((className) => ({ [`classes.${className}`]: { $exists: true } })),
      });
  
      if (existingDocument) {
        const updateData = Object.keys(classes).reduce((acc, className) => {
          acc[`classes.${className}`] = { $each: classes[className] };
          return acc;
        }, {});
  
        await Classes.updateOne({}, { $push: updateData });
  
        console.log('Data added to existing document for all classes');
      } else {
        const newClass = new Classes({ classes });
        await newClass.save();
        console.log('New document created with data for all classes');
      }
  
      res.status(200).json({ message: 'Operation completed successfully' });
    } catch (error) {
      console.error('Error processing class data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      mongoose.connection.close();
    }
  });
  
  

module.exports={registerUser, authUser,schoolData,classesData};