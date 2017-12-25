var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var teacherModel = new Schema({
    teacherId: { type: String, index: true, unique: true },
    name: String,
    lastname: { type: String, trim: true, lowercase: true },
    age: { type: Number, required: true, min: 10, max: 1000 },
    title: String,
    isFullTime: { type: Boolean, default: true },
    updatedOn: { type: Date, default: Date.now }
});


module.exports = mongoose.model("teacher", teacherModel);