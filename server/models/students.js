const mongoose = require("mongoose");

const studentsSchema = mongoose.Schema(
    {
    Students:{
   }
}, {timestamps: true,})

const Students = mongoose.model("Students", studentsSchema);

module.exports = Students;