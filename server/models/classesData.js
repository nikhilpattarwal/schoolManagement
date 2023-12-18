const mongoose = require("mongoose");

const classesSchema = mongoose.Schema(
    {
    classes:{
       type: Object,
       required: true
   }
}, {timestamps: true,})


const Classes = mongoose.model('Classes', classesSchema);

module.exports = Classes;