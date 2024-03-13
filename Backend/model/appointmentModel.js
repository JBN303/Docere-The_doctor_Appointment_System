const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  appno: Number,
  patientName: String,
  age: Number,
  date: Date,
  day: String,
  purpose: String,
  time: String,
  msg:String,
  doctorName: String,
  doctorLocation: String,
  patientEmail: String, // Make sure these fields are defined in the schema
  patientContactNo: String,
  status: { type: String, default: 'pending' } // Add status field with default value 'active'
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
