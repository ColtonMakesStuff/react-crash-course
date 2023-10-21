const { Schema, model } = require('mongoose');
const User = require('./User');


const postSchema = new Schema({
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: false 
    },
    content: { 
      type: String, 
      required: true 
    },
    // Other fields...
  });

  const Post = model('posts', postSchema);
  ////////////////// create and delete post methods //////////////////
//create post
Post.createPost = async function(req, res) {
    try {
        this.userId = req.body.userId;
        this.content = req.body.content;
        const post = await this.save();
        const user = await User.findByIdAndUpdate(req.body.userId, {$push: {posts: post._id}});
    res.status(200).json();
    } catch (err) {
        res.status(500).json({error: `Error creating user${err}`});
    }
}
//get all posts
Post.getAllPosts = async function(req, res) {
    try {
    const posts = await Post.find();
    res.status(200).json(posts);
    } catch (err) {
    res.status(500).json({ error: `Error getting all posts${err}` });
    }
}
//delete post
Post.deletePost = async function(req, res) {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: `Error deleting post${err}` });
    }
}
    //create post model


module.exports = Post;