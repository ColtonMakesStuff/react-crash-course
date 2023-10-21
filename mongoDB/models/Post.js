const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    content: { 
      type: String, 
      required: true 
    },
    // Other fields...
  });
  function callback(error, comment) {
  if (error) {
    console.error(comment);
  } else {
    console.log(comment);
  }
}
  ////////////////// create and delete post methods //////////////////
//create post
postSchema.methods.createPost = function(userId, content, callback) {
  this.userId = userId;
  this.content = content;
  this.save(callback);
}
//delete post
postSchema.methods.deletePost = function(postId, callback) {
    this.findByIdAndDelete(postId, callback)
    }