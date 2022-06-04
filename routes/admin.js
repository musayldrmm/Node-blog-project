const express=require('express')
const router=express.Router()
const Post = require('../models/program')

router.get('/:id', (req, res) => {
    userid=req.params.id
    Post.find({},function(err,docs){
        res.status(200).send(docs)
    })
});

module.exports=router
