const { ObjectId } = require('mongoose').Types;
const { User, Post} = require('../models');

const express = require('express');
const router = express.Router();
//////////////// Post routes //////////////////
// Create a post
router.post('/posts', async (req, res) => {await post.createPost(req, res);});
  // body {
    //   "userId": "5f9d0b6a1c9d440000f3b3d6",
    //   "content": "Hello world"
  //}
  //get all posts
router.get('/posts', async (req, res) => {await Post.getAllPosts(req, res);});

 //delete post
router.delete('/posts/:id', async (req, res) => {await post.deletePost(req, res);});
//////////////// User routes //////////////////
// Create a user
router.post('/users', async (req, res) => {
  const user = new User();
  await user.createUser(req, res);
});
//get all users
router.get('/users', async (req, res) => {
  const user = new User();
  await user.getAllUsers(req, res);
});
// add to following
router.put('/users/following/:id', async (req, res) => {
  const user = new User();
  await user.addToFollowing(req, res);
});

module.exports = router;
