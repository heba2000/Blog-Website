const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const req = require('express/lib/request');
const Post = require('../models/postModel');
const imgMiddleware = require('../middleWares/uploadImgMiddleware');

router.get('/posts',async (req, res, next) => {
    const posts = await Post.find().populate({path:'user', select:'userName -_id'});
    res.json({'Response':'succcess','Data':posts}); 
});

router.post('/user', async(req, res, next) => {
    const newUser = req.body;
    try{ 
        const userDoc = await User.create(newUser)
        res.json({'Response':'succcess','Data':userDoc});
    }
    catch(error)
    {
        next(error.message);
    } 
});

router.post('/post', imgMiddleware.single('image') , async(req, res, next) => {
    const newPost = req.body;
    try{ 
        if(req.file) { newPost.image = req.file.path}
        console.log(newPost.image)
        const postDoc = await Post.create(newPost)
        res.json({'Response':'Success', 'Data':postDoc });
    }
    catch(error)
     {
        next(error.message);
    } 
});

router.patch('/:id' , async (req,res,next) => {
    const { id } = req.params;
    const { title ,postBody , tags, image} = req.body; 
    const updatedPost = Post.findOneAndUpdate({_id:id},{title ,postBody , tags, image},{new:true}).exec()
    .then(data => res.json({'Response':'Success', 'Data':data}))
    .catch(err => next("Id not found"))
})

router.delete('/:id' , async (req,res,next) => {
    const { id } = req.params;
    const deleteDoc = Post.deleteOne({_id:id}).exec()
    .then (data => res.json({'Response':'Success', 'Data':data})) 
    .catch(err => next("Id nooot found") )

})
module.exports = router;