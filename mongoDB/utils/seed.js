const connection = require('../config/connection');
const { User} = require('../models');
const users = require('./data');


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


  console.timeEnd('seeding');
  process.exit(0);
});