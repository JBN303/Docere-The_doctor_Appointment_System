const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://jibinpjohny:jibinjohny@cluster0.5wy66gv.mongodb.net/ddb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;
