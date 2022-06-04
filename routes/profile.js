const express=require('express')
const router=express.Router()
const User = require("../models/user");
const Program = require("../models/program")
router.get('/', (req, res) => {
    const id = req.query.id
    const userfind=User.findById(id)
    const programfind=Program.find({Programowner:id})
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

module.exports=router
