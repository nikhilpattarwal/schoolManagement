const expressAsyncHandler = require("express-async-handler");
const Attendance = require("../models/attendanceData");

const attendanceSheet = expressAsyncHandler(async (req, res) => {
  try {
    const { data, month, classs } = req.body;
    const existingDocument = await Attendance.find({});

    if (existingDocument.length) {
      const isExistingClass = await Attendance.findOne({ [`dailyAttendance.${classs}`]: { $exists: true } });

      if (isExistingClass) {
          const keysToCheck = Object.keys(data);
          const isExistingKeys = await Attendance.findOne({
            [`dailyAttendance.${classs}.${month}`]: { $exists: true }
          });
          console.log(data, month, classs);
           console.log(isExistingKeys);
          if (isExistingKeys) {
            console.log("if")
            const existingKeys = isExistingKeys.dailyAttendance[classs][month];
            // Check if all keys exist in the existing keys
            const allKeysExist = keysToCheck.filter(key => key in existingKeys);
            const keysNotExist = keysToCheck.filter(key => !(key in existingKeys));

            if (allKeysExist.length>0) {
              console.log("allkeysExist",allKeysExist);  
              try {
                await Promise.all(allKeysExist.map(async (key) => {
                  const updateQuery = {
                    [`dailyAttendance.${classs}.${month}.${key}`]: { $exists: true }
                  };
                  const existingData = await Attendance.findOne(updateQuery);
                  const existingKeyData = existingData ? existingData.dailyAttendance[classs][month][key] : {};
                  console.log("Existing Key Data:", existingKeyData);
                  const mergedData = { ...existingKeyData, ...data[key] };
                  console.log("Merged:", mergedData);

                  const updateData = {
                    $set: {
                      [`dailyAttendance.${classs}.${month}.${key}`]: {
                        ...existingKeyData, ...data[key]
                      }
                    }
                  };
              
                  await Attendance.findOneAndUpdate(updateQuery, updateData, { upsert: true });
                }));
              } catch (err) {
                console.log(err);
              }            
            }
            if (keysNotExist.length>0){

              await Promise.all(keysNotExist.map(async(key)=>{
                await Attendance.updateOne(
                  { [`dailyAttendance.${classs}.${month}.${key}`]: { $exists: false } },
                  { $set: { [`dailyAttendance.${classs}.${month}.${key}`]: data[key] } }
                );
              }))
            }
          } else{
            await Attendance.updateOne(
              { [`dailyAttendance.${classs}.${month}`]: { $exists: false } },
              { $set: { [`dailyAttendance.${classs}.${month}`]: data } }
            );
          }
      } else {
        // create new class
        console.log("else")

       console.log(data, month, classs);
         await Attendance.updateOne(
          { [`dailyAttendance.${classs}.${month}`]: { $exists: false } },
          { $set: { [`dailyAttendance.${classs}.${month}`]: data } }
        );
        console.log("dataaddedSuccesfully class created")
        console.log(tt);
      }
    } else {
      const newAttendance = new Attendance({
        dailyAttendance: { [classs]: { [month]: data } }
      });
      await newAttendance.save();
      console.log("Attendance data saved successfully");
    }

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('Error in attendanceSheet:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = { attendanceSheet };
