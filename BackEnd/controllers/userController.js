const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');
const webtoken = require('jsonwebtoken'); 

const login = async ({userName,password} , next) => {
    const newUser = await User.findOne({userName}).exec();
    if(!newUser)
    {
        next("Invalid User");
        return;
    }
    const validUser = bcrypt.compareSync(password, newUser.password); 
    if(!validUser){
        next ("Unuathorized user") 
        return;
    }
    else
    { 
       const token = webtoken.sign({userName, _id:newUser.id,
        maxAge:'1d'
    }, 'hf5246748sjnjdhdhhddnn')
    return token
    }
    // next()
}

module.exports = {login};