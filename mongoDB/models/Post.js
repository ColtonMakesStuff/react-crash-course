const { Schema, model } = require('mongoose');
const User = require('./User');
const { forEach } = require('../utils/data');


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
    comments: [{
      content: { 
        type: String, 
        required: true 
      },
      commentId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      createdAt: {
        type: Date,
        default: Date.now,
        // use moment to format date on get
        get: (createdAtVal) => dateFormat(createdAtVal),
      },
      // Other fields...

      commenterId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: false 
    },
    }],        
    createdAt: {
      type: Date,
      default: Date.now,
      // use moment to format date on get
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    // Other fields...
  });
  

  const Post = model('posts', postSchema);
  ////////////////// create and delete post methods //////////////////
//create post
Post.createPost = async function(req, res) {
    try {
        const post = new Post({
            userId: req.body.userId,
            content: req.body.content
        });
        const savedPost = await post.save();
        const user = await User.findByIdAndUpdate(req.body.userId, {$push: {posts: savedPost._id}});
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json({error: `Error creating user${err}`});
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
 ////////////////// create and delete comments methods //////////////////
//create comment
Post.createComment = async function(req, res) {
    try {
        const postId = req.body.postId;
        const commenterId = req.body.userId;
        const content = req.body.content;
        const post = await Post.findByIdAndUpdate(postId, {$push: {comments: {content: content, commenterId: commenterId}}}, {new: true});
        console.log(post._id);
        const user = await User.findByIdAndUpdate(commenterId, {$push: {comments: post.comments[post.comments.length - 1]._id}});
    res.status(200).json(user);
    } catch (err) {
        res.status(500).json({error: `Error creating comments${err}`});
    }
}
//delete comment
Post.deleteComment = async function(req, res) {
    try {
        const postId = req.params.postId;
        const commentId = req.params.commentId;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const commentIndex = post.comments.findIndex(comment => comment.commentId.toString() === commentId);

        if (commentIndex === -1) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        post.comments.splice(commentIndex, 1);

        await post.save();

        res.status(200).json({ message: 'Comment deleted' });
    } catch (err) {
        res.status(500).json({ error: `Error deleting comment: ${err}` });
    }
};


//get all comments
Post.getAllComments = async function(req, res) {
    try {
    const comments = await Post.find();
    res.status(200).json(comments);
    } catch (err) {
    res.status(500).json({ error: `Error getting all comments${err}` });
    }
}

 ////////////////// find posts methods //////////////////
//get all posts
Post.getAllPosts = async function(req, res) {
    try {
    const posts = await Post.find();
    res.status(200).json(posts);
    } catch (err) {
    res.status(500).json({ error: `Error getting all posts${err}` });
    }
}
//get post by id
Post.getPostById = async function(req, res) {
    try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
    } catch (err) {
    res.status(500).json({ error: `Error getting post${err}` });
    }
}
//get post by user id
Post.getPostByUserId = async function(req, res) {
    try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
    } catch (err) {
    res.status(500).json({ error: `Error getting posts${err}` });
    }
}
//get posts by multiple user ids
Post.getPostsByUserIds = async function(req, res) {
    try {
        const posts = [] 
    forEach(req.params.id, async function(id) {
        const post = await Post.findById(id);
        posts.push(post);
    })
    res.status(200).json(posts);
    } catch (err) {
    res.status(500).json({ error: `Error getting post${err}` });
    }
}

    //create post model


module.exports = Post;