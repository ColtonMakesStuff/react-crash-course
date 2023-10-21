const { ObjectId } = require('mongoose').Types;
const { User} = require('../models');
const express = require('express');
const router = express.Router();

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

module.exports = router;
