const webtoken = require('jsonwebtoken');
const User = require('../models/userModel');

const authorize = (req , res , next) => {
        const { authorization } = req.headers;
        const payload = webtoken.verify(authorization,'hf5246748sjnjdhdhhddnn')
       User.findOne({ userName:payload.userName })
       .then(user => {
           req.user = user ;
           console.log(user)
           next(); })
}
module.exports = authorize;