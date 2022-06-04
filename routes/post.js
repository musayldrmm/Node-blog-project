const express=require('express')
const router=express.Router()
const Post = require('../models/program')
router.get('/:id', (req, res) => {
  
    res.send("Post tasın");
});

router.post("/:id", async (req, res) => {
    try {
      let NewPost = new Post({
        Programname: req.body.value.Programname,
        ProgramDesc: req.body.value.ProgramDesc,
        Programowner:req.params.id
      });
      await NewPost.save();
   res.redirect('/')
    } catch (error) {
      console.log(error);
    }
  });

module.exports=router
