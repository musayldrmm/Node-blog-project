const express=require('express')
const router=express.Router()
const User = require("../models/user");
const Program = require("../models/program")
router.get('/', (req, res) => {
    console.log("buradasın kardeşim")
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

module.exports=router
