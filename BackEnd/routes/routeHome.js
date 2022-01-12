const express = require('express');
const router = express.Router();
const req = require('express/lib/request');
const Post = require('../models/postModel');
const User = require('../models/userModel');

router.get('/',async (req, res, next) => {
    try {
        let{page ,size } = req.query;   
        if(!page || page == 0 ) 
           { page = 1 }
        if(!size)    //limit
        { size = 5 }   
            //limit or size = 5
            //then it will skip 5
        const limit = parseInt(size);    
        const  skip = (page-1) * size ;
        const posts = await Post.find().limit(limit).skip(skip).populate({path:'user', select:'userName _id'});
        res.json({'Response':'succcess','Data':posts}); 
        }

    catch(err)  
    { 
        console.log("error")
        res.next("error")
    }  
});


router.get('/:id',async (req, res, next) => {
    const { id } = req.params;
    const posts = await Post.findById(id).populate({path:'user', select:'userName _id'});
    res.json({'Response':'succcess','Data':posts}); 
});

router.get('/author/:id',async (req, res, next) => {
    const { id } = req.params;
    const users = await User.findById(id);
    res.json({'Response':'succcess','Data':users}); 
});

router.get('/authorPosts/:id',async (req, res, next) => {
    const { id } = req.params;
    const authorPosts = await Post.find({user:id})
    res.json({ "Response":"sucsess" ,'Data':authorPosts});    
});

router.get('/search/:searchTerm',async (req, res, next) => {
    console.log(req.params.searchTerm)
        var regex = new RegExp(req.params.searchTerm , "i")
        const posts = await Post.find({ $or:[ {title:regex} , {tags:regex} , {postBody:regex} ]}).populate({path:'user', select:'userName _id'});
        res.json({'Response':'succcess','Data':posts}); 
 
});

module.exports = router;