const mongoose=require('mongoose');
const Schema = mongoose.Schema


const UserSchema=new mongoose.Schema(
    {
    name:{type:String,required:true},
    surname:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    hakkinda:{type:String,required:true},
    password:{type:String,required:true},
}
);

const User=mongoose.model('User',UserSchema)
module.exports=User;


