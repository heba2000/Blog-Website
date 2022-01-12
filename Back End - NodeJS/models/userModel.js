const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { hashSync } = require('bcrypt');
const { options } = require('../routes/routePost');

const userSchema = new mongoose.Schema ({
    userName: {
        type: String,
        unique: [true ,'this username already taken'],
        required: [true ,'user name is required'],
        maxlength: [15,`user name can't be more than 15 charachters`],
        minlength: [5,'user name should be at least 5 charachters']
      },
    firstName : {
      type: String,
      match : [/[a-zA-Z]{3,12}/ , `First Name should be between 3-10 characters and letters only`]
    },
    lastName: {
      type: String,
      match : [/[a-zA-Z]{3,12}/ , `Last Name should be between 3-10 characters and letters only`]
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      }
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [5,'password too short'],
      maxlength: [15,`password can't be more than 15 charachters`],
    }
    },
    {
        toJSON:{
          transform: (doc, ret, options) => {
              delete ret.password;
              return ret ;
          }
        }
      }
    ) 

//password middleware
userSchema.pre('save', function() {
  console.log(this); //user document
  const hash = bcrypt.hashSync(this.password,8)
  this.password = hash;
});

userSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true;
  next();
});

const User = mongoose.model('User', userSchema );
module.exports = User;