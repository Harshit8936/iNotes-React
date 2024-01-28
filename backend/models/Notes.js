const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    title:{type:String},
    description:{type:String},
    tag:{type:String,default:"General"},
    createdAt:{type:Date,default:Date.now}
})

module.exports = mongoose.model('Note',notesSchema);