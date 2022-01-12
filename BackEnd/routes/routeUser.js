const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const {login} = require('../controllers/userController');
const req = require('express/lib/request');
const authMiddleWare = require('../middleWares/tokenMiddleWare');

router.post('/signIn' ,  async (req, res, next) => {
    const {userName , password} = req.body;
    const token = await login({userName,password} , next) 
    res.json({"userName": userName , "userToken":token});
  
})

router.get('/', authMiddleWare , async(req, res, next) => {
    const thisUser = req.user;
    res.json({'Response':'success', 'Data':thisUser});    
});

router.patch('/' , authMiddleWare ,async (req,res,next) => {
    const {userName, firstName , lastName ,email} = req.body;
    const updatedUser = User.findOneAndUpdate( {_id:req.user._id} ,{userName , firstName , lastName ,email},{ returnOriginal:false} ).exec()
    .then (data => res.json({'Response':'success', 'Data':data})) 
    .catch(err => next(err.message))
})

module.exports = router;

