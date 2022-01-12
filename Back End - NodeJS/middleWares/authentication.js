const webtoken = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = (req , res , next) => {
    try{ 
        const { authorization } = req.headers;
        const payload = webtoken.verify(authorization,'hf5246748sjnjdhdhhddnn')
       User.findOne({ userName:payload.userName })
       .then(user => {
           req.user = user ;
            next();
       })
    }
    catch (error){
        next(error.message);
    }

}
module.exports = auth;