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
  blockedAcounts: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  // Use built in date method to get current date
  lastAccessed: { type: Date, default: Date.now },
  posts: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Post' 
  }]
});
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
}
)
//create user method
userSchema.methods.createUser = async function(req, res) {
  try {
    this.userName = req.body.userName;
    this.password = req.body.password;
    this.email = req.body.email;

    const user = await this.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

//getallusers method
userSchema.methods.getAllUsers = async function(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: `Error getting all users${err}` });
  }
};
 //create model 
 const User = model('users', userSchema);

 // Export model
 module.exports = User;









// function callback(error, comment) {
//   if (error) {
//     console.error(comment);
//   } else {
//     console.log(comment);
//   }
// }
// ////////////////// user methods //////////////////
// //create user
// userSchema.methods.createUser = function(userName, password, email, callback) {try {
  
//     this.userName = userName;
//     this.password = password;
//     this.email = email;
//     this.save(callback(null, 'user created'));
// } catch (error) {
//   callback(error, 'Error creating user');
// }

// }

// //delete user
// userSchema.methods.deleteUser = async function(userId, callback) {
//   try {
//   this.findByIdAndDelete(userId, callback(null, 'user deleted'))
//   } catch (error) {
//     callback(error, 'Error deleting user');
//   }
// }

// //update user
// userSchema.methods.updateUser = async function(userId, userName, password, email, callback) {
//   try {
//   this.findById(userId, function(error, user) {
//     if (error) {
//       callback(error, null);
//     } else {
//       user.userName = userName;
//       user.password = password;
//       user.email = email;
//       user.save(callback(null, 'user updated'));
//     }
//   });
// } catch (error) {
//   callback(error, 'Error updating user');
// }
// }


// ////////////////// verify password method //////////////////
// userSchema.methods.comparePassword = function(password, callback) {
//   bcrypt.compare(password, this.password, function(error, isMatch) {
//     if (error) {
//       return callback(error, null);
//     } else {
//       callback(null, isMatch);
//     }
//   });
// }

// ////////////////// follow and unfollow methods //////////////////
// //follow
// userSchema.methods.follow = async function(userToFollowId, callback) {
//   try {
//     const userToFollow = await User.findOne({ _id: userToFollowId });
//     if (userToFollow.blockedAccounts.includes(this._id)) {
//       return callback(null, "You are blocked by this user");
//     } else {
//       this.following.push(userToFollowId);
//       userToFollow.followers.push(this._id);  
//       await this.save(callback(null, "following user added"))
//     }
//   } catch (error) {
//     callback(error, 'Error following user');
//   }
// }
// //unfollow
// userSchema.methods.unfollow = async function(userToUnfollowId, callback) {
//   try {
//     const userToUnfollow = await User.findOne({ _id: userToUnfollowId });
//   this.following.remove(userToUnfollow);
//   userToUnfollow.followers.remove(this._id);
//   this.save(callback(null, 'following user removed'));
// } catch (error) {
//   callback(error, 'Error unfollowing user');
// }
// }
// //block
// userSchema.methods.block = async function(userToBlock, callback) {
//   try {
//   this.followers.remove(userToBlock);
//   this.blockedAcounts.add(userToBlock);
//   this.save(callback(null, 'user blocked'));
// } catch (error) {
//   callback(error, 'Error blocking user');
// }
// }
// //unblock
// userSchema.methods.unblock = async function(userToUnblock, callback) {
//   try {
//   this.blockedAcounts.remove(userToUnblock);
//   this.save(callback(null, 'user unblocked'));
// } catch (error) {
//   callback(error, 'Error unblocking user');
// }
// }

// //create model 
// const User = model('User', userSchema);

// // Export model
// module.exports = User;





