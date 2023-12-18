const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema(
    {
    dailyAttendance:{
       type: Object,
       required: true
   }
}, {timestamps: true,})


const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;