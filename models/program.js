const mongoose= require('mongoose');
const Schema = mongoose.Schema

const ProgramSchema=new mongoose.Schema({
    Programname:{type:String},
    ProgramDesc:{type:String},
    Programowner:{type:Schema.Types.ObjectId,ref:'User'}
})
const Program = mongoose.model('Program',ProgramSchema)
module.exports=Program;