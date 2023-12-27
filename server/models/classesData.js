const mongoose = require("mongoose");

const classesSchema = mongoose.Schema(
    {
    classesData:{
       type: Object,
       required: true
   }
}, {timestamps: true,})


const Classes = mongoose.model('Classes', classesSchema);

module.exports = Classes;