const express=require('express')
const router=express.Router()
const Post = require('../models/program')
router.get('/:id', (req, res) => {
  
    res.send("Post tasın");
});

router.post("/:id", async (req, res) => {
    try {
      let NewPost = new Post({
        Programname: req.body.Programname,
        ProgramDesc: req.body.ProgramDesc,
        Programowner:req.params.id
      });
      await NewPost.save();
      res.send(200);
    } catch (error) {
      console.log(error);
    }
  });

module.exports=router
