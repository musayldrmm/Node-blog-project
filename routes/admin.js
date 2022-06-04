const express=require('express')
const router=express.Router()
const User = require("../models/user");
const Program = require("../models/program")
router.get('/', (req, res) => {
    
    const userfind=User.find({})
    const programfind=Program.find({})
    Promise.all([
        userfind,
        programfind,
      ]).then(([
        user,
        program
      ]) => {
       let data ={user,program}
       console.log(programfind)
       res.send(200,data)
      })
});

router.get('/delete/user',(req,res)=>{
    const id=req.query.id
    User.findByIdAndRemove(id, function (err, user) {
        res.status(200).send(user);
        console.log(err)
      });
})
router.get('/delete/program',(req,res)=>{
    const id=req.query.id
    Program.findByIdAndRemove(id, function (err, user) {
        res.status(200).send(user);
        console.log(err)
      });
})
module.exports=router;
