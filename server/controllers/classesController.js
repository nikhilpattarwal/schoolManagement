const expressAsyncHandler = require("express-async-handler");
const Classes = require("../models/classesData");

const classesData = expressAsyncHandler(async (req, res) => {

    try {
      const { classesData } = req.body;
      console.log(classesData.classss)

      const existingDocument = await Classes.find({'classesData.user_id': classesData.user_id});
      console.log(existingDocument);
      console.log("iff",existingDocument);
      if(existingDocument.length){

        const existingClass = existingDocument.some(doc => doc.classesData[classesData.classss]);

        if(existingClass){
          console.log("classExists", existingClass);
          await Classes.updateOne(
            {'classesData.user_id': classesData.user_id, [`classesData.${classesData.classss}`]: { $exists: true } },
            { $push: { [`classesData.${classesData.classss}`]: classesData } }
          );
        }else{
          console.log("notExists", existingClass);
          await Classes.updateOne(
            {'classesData.user_id': classesData.user_id, [`classesData.${classesData.classss}`]: { $exists: false } },
            { $set:{[`classesData.${classesData.classss}`]: [classesData] } }
          );
        }

      }else{
        const newClass = new Classes({
          classesData: {
            user_id: classesData.user_id,
            [classesData.classss]: [...(classesData[classesData.classss] || []), classesData],
          },
        });
        await newClass.save();
      }
      res.status(200).json({ message: 'Operation completed successfully' });
    } catch (error) {
      console.log(error)
    }

  });

  
  const fetchClasses = expressAsyncHandler(async (req, res) => {
    try {
      const userId = req.query.userId;
      const classes = await Classes.find({'classesData.user_id': userId});
      res.status(200).json(classes);
    } catch (error) {
      console.error('Error fetching classes:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  const deleteClass = expressAsyncHandler(async(req,res)=>{
    try {
      console.log(req.query);
      const {userId, classss, id} = req.query;
      console.log(userId, classss, id);
      // const existingDocument = await Classes.find({'classesData.user_id': userId});
      const updatedDocument = await Classes.updateOne(
        {
          'classesData.user_id': userId,
          [`classesData.${classss}.id`]: id,
        },
        {
          $pull: {
            [`classesData.${classss}`]: { id: id },
          },
        }
      );
      if (updatedDocument.modifiedCount >0) {
        // At least one document was modified, meaning an item was removed
        console.log(updatedDocument);
        res.status(200).json({ message: 'Operation completed successfully' });
      } else {
        // Document not found or item not deleted
        res.status(404).json({ error: 'Document not found or item not deleted' });
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })

  module.exports = {classesData,fetchClasses,deleteClass};