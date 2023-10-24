// Define Mongoose
const { Schema, model } = require('mongoose');
const bcrypt = require("bcryptjs")

// Create a new instance of the Mongoose schema to define shape of each document
const userSchema = new Schema({

  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true 
  },
  email: {  
    type: String, 
    required: true, 
    unique: true 
  },
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  // blockedAcounts: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  // Use built in date method to get current date
  lastAccessed: { type: Date, default: Date.now },
  thoughts: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'posts' 
  }],
  reactions: [{
    type: Schema.Types.ObjectId, 
    ref: 'posts' 
  }]
});
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
}
)

 //create model 
 const User = model('users', userSchema);
//create user method
User.createUser = async function(req, res) {
  try {
    this.userName = req.body.userName;
    this.password = req.body.password;
    this.email = req.body.email;

    const user = await this.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({error: 'Error creating user'});
  }
};

//getallusers method
User.getAllUsers = async function(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: `Error getting all users${err}` });
  }
};
//add to following method
User.addToFollowing = async function(req, res) {
  try {
    const user = await User.findById(req.params.id);
    const userToFollowId = await User.findById(req.body.userToFollowId);
    console.log(userToFollowId);
    console.log(user);
    user.following.push(userToFollowId);
    userToFollowId.followers.push(user);
    res.status(200).json(user.following);
  } catch (err) {
    res.status(500).json({ error: `Error adding to following${err}` });
    
  }
;}




 // Export model
 module.exports = User;


