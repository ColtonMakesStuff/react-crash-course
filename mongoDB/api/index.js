const { ObjectId } = require('mongoose').Types;
const { User, Thought} = require('../models');

const express = require('express');
const router = express.Router();
//////////////// thought routes //////////////////



// Create a thought
router.post('/thoughts', async (req, res) => {await Thought.createThought(req, res);});
  // body {
    //   "userId": "5f9d0b6a1c9d440000f3b3d6",
    //   "content": "Hello world"
  //}
  //get all thoughts
router.get('/thoughts', async (req, res) => {await Thought.getAllThoughts(req, res);});
 //delete thought by id
router.delete('/thoughts/:id', async (req, res) => {await Thought.deleteThought(req, res);});
//update thought by id
router.put('/thoughts/:id', async (req, res) => {await Thought.updateThought(req, res);});
//get thought by id
router.get('/thoughts/:id', async (req, res) => {await Thought.getThoughtById(req, res);});




//////////////// reaction routes //////////////////



//create a Reaction
router.put('/reactions', async (req, res) => {await Thought.createReaction(req, res);});
//delete Reaction
router.delete('/reactions/:id', async (req, res) => {await Thought.deleteReaction(req, res);});
//get all Reactions
router.get('/reactions', async (req, res) => {await Thought.getAllReactions(req, res);});



//////////////// user routes //////////////////



// Create a user
router.post('/users', async (req, res) => {await User.createUser(req, res);});
//get all users
router.get('/users', async (req, res) => {await User.getAllUsers(req, res);});
// add to following
router.put('/users/following/:id', async (req, res) => {await User.addToFollowing(req, res);});

module.exports = router;
