const mongoose = require ('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
const postSchema = new mongoose.Schema({
  postID: { type: Number ,  default: 0},
    title: {
        type: String,
        required: [true ,'Title is required'],
        minlength: [5,'Title should be at least 5 charachters'],
        maxlength: [20,`Title can't be more than 20 charachters`],
      },
    postBody: {
      type: String,
      required: [true ,'Post body is required'],
      minlength: [20 , 'post should be at least 30 characters']
    },
    tags: [{
      type: String,
      minlength: [3,`Tag is at least 3 charachters`],
      maxlength: [12,`Tag can't be more than 12 charachters`],
    }],
    createdAt: {
        type:Date,
        default:Date.now()
    },
    image:{
      type:String
    },
  user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref:'User'
  }
})

postSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true;
  next();
});

postSchema.pre('save', function() {
  console.log(this); //user document
});

postSchema.plugin(AutoIncrement, {inc_field: 'postID'});
const Post = mongoose.model('Post',postSchema);
module.exports = Post;




