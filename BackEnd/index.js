const express = require ('express');
const app = express();
const PostRoute = require('./routes/routepost');
const UserRoute = require('./routes/routeUser');
const adminRoute = require('./routes/routeAdmin');
const signUpRoute = require('./routes/routeSignUp')
const homeRoute = require('./routes/routeHome')
const authMiddleWare = require('./middleWares/authentication');
const imgMiddleware = require('./middleWares/uploadImgMiddleware')
const cors = require('cors');
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const req = require('express/lib/request');
mongoose.connect( 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.ndsph.mongodb.net/blog')

// ======================================================================

app.use(cors());

app.use(express.json({limit: '50mb'}));  
app.use('/uploads', express.static('uploads'));
app.use('/signUp' , signUpRoute);    
app.use('/Home' , homeRoute);   
app.use('/admin' ,adminRoute);


app.use('/users' , UserRoute);
app.use(authMiddleWare);        
app.use('/posts',PostRoute);

app.use('*',(req,res,next) => { res.status(404).end() })
app.use((err,req,res,next) => { res.status(500).json(err) })



const  PORT  = 3000 || process.env.PORT ;
app.listen(PORT,() => {console.log(`server ${PORT} is Up`)});
