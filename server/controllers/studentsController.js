const expressAsyncHandler = require("express-async-handler");
const Students = require("../models/students");

const studentsDataHandler = expressAsyncHandler (async (req, res) => {
    try {
      const { studentsData } = req.body;
  
      console.log(studentsData);
  
      const existingDocument = await Students.find({});
        console.log(existingDocument.length);
      if (existingDocument.length) {
        // Grade exists, add the student to the existing array

        const isExistingClass = await Students.findOne({ [`Students.${studentsData.grade}`]: { $exists: true } });
        if(isExistingClass){
          await Students.updateOne(
            { [`Students.${studentsData.grade}`]: { $exists: true } },
            { $push: { [`Students.${studentsData.grade}`]: studentsData } }
          );
          console.log('Student added to existing grade:', studentsData);
        }else{
          await Students.updateOne(
            { [`Students.${studentsData.grade}`]: { $exists: false } },
            { $set:{[`Students.${studentsData.grade}`]: [studentsData] } }
          );
          console.log('New document created with data for all classes');
        }

      
      } else {
        // Grade doesn't exist, create a new grade and add the student
        console.log("else")
        const newClass = new Students({
          Students: { [studentsData.grade]: [studentsData] },
        });
        console.log(newClass);
        await newClass.save();
       
      }
  
      res.status(200).json({ message: 'Operation completed successfully' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  const fetchStudents = expressAsyncHandler(async (req, res) => {
    try {
      const students = await Students.find();
      res.status(200).json(students);
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = {studentsDataHandler,fetchStudents};