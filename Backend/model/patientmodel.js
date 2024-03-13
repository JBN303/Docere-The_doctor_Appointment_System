// models/patientModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name: String,
    Address: String,
    Phone: Number,
    Email: String,
    Age: Number,
    Gender: String,
    Username: String,
    Password: String,
    status: { type: String, default: 'Inactive' }, // Add the status field
});

const User = mongoose.model('User', userSchema);

module.exports = User;