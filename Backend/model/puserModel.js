const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const puserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

// Hash the password before saving it
puserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Puser = mongoose.model('patient', puserSchema);

module.exports = Puser;