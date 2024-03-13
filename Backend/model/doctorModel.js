// models/doctorModel.js
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    nmc: Number,
    name: String,
    age: Number,
    gender: String,
    experience: String,
    languages: String,
    location: String,
    pincode: String,
    specialization: String,
    qualification: String,
    profile: String,
    Certificate: String,
    phone: Number,
    email: String,
    cpass: String,
    about: String,
    status: { type: String, default: 'Inactive' },
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
