const express = require ('express');
const req = require('express/lib/request');
const router = express.Router();
const Post = require('../models/postModel')
const imgMiddleware = require ('../middleWares/uploadImgMiddleware')

router.get('/',async (req, res, next) => {
    var userId = req.user._id
    const userNewPost = await Post.find({user:userId}).populate( {path: 'user', select: 'userName -_id'})
    res.json({ "Response":"sucsess" ,'Data':userNewPost});    
});

router.get('/:id',async (req, res, next) => {
    const { id } = req.params;
    const userPost = Post.findOne({user:req.user._id , _id:id }).populate( {path: 'user', select: 'userName -_id'})
    .then (data => { res.json({ "Response":"success" ,'Data':data}) }) 
    .catch(err => next("Id not found"))
});

router.post('/', imgMiddleware.single('image') ,async(req, res, next) => {
    const newPost = req.body;
    try{ 
        if(req.file) { newPost.image = req.file.path ; newPost.user = req.user.id}
        console.log(newPost.image , newPost.user)
        const userNewPost = await Post.create(newPost)
        res.json({"Response":"success" ,'Data':userNewPost});
    }
    catch(error){
        next(error.message);
    } 
});

router.delete('/:id' , async (req,res,next) => {
    const { id } = req.params;
    var userId = req.user._id;
    let postDocument = Post.findOne({_id:id})
    .then(data => { if(data.user.equals(userId) )  
        { 
            const deleted = Post.deleteOne({ _id:id })
            .then(res.json({"Response":"success",'Data':data}))
            .catch(err=> next(err.message))
             
        } 
    })
    .catch(err => next("Id not found") )  
})

router.patch('/:id' , imgMiddleware.single('image'), async (req,res,next) => {
    const { id } = req.params;
    const {title , postBody , tags } = req.body;
    const postDocument = Post.findById(id)
    .then(data => { 
        if( data.user.equals(req.user._id)) 
        {  
            if(req.file) { 
            const updateDoc = Post.findOneAndUpdate({_id:id},{title ,postBody , tags , image:req.file.path },{new: true}).exec()
            .then( newData => res.json({'Response':'success' , 'Data':newData } ) )
            .catch(err => next(err.message)) 
            }
            else
            {
                const updateDoc = Post.findOneAndUpdate({_id:id},{title ,postBody , tags},{new: true}).exec()
                .then( newData => {console.log(newData) ; res.json({'Response':'success' , 'Data':newData })})
                .catch(err => next( {'Response':err.message})) 
            }

        } 
       
    })
    .catch(err => next(err.message) )  
})

module.exports = router;
