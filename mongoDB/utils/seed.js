const connection = require('../config/connection');
const { User, Post} = require('../models');
const users = require('./data');
const postData = require('./postData');


console.log(users)
// Start the seeding runtime timer
console.time('seeding');

// Creates a connection to mongodb
connection.once('open', async () => {
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
    }

await User.insertMany(users)
  .then(() => console.log('Database seeded!'))
  .catch(err => console.error('Failed to seed database:', err))

 //seed the posts collection 
  let postCheck = await connection.db.listCollections({ name: 'posts' }).toArray();
  if (postCheck.length) {
    await connection.dropCollection('posts');
  }

await Post.insertMany(postData)
.then(() => console.log('Database seeded!'))
.catch(err => console.error('Failed to seed database:', err))


  console.timeEnd('seeding');
  process.exit(0);
});