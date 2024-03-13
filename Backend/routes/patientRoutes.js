const express = require('express');
const User = require('../model/patientmodel'); // Adjust the path accordingly
const router = express.Router();
const mongoose = require('mongoose');
const Appointment = require('../model/appointmentModel');

router.post('/pnew', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/user', async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid patient ID' });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching patient by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Modify your appointment creation route in the patientRoutes.js file

router.post('/create-appointment', async (req, res) => {
  try {
    const { doctorId, patientName, age } = req.body;
    const newAppointment = new Appointment({ doctorId, patientName, age });
    const savedAppointment = await newAppointment.save();
    res.status(200).json(savedAppointment);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/patients/:patientId/appointments', async (req, res) => {
  try {
    const { patientId } = req.params;

    // Validate patientId
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({ message: 'Invalid patient ID' });
    }

    // Find appointments for the given patient
    const appointments = await Appointment.find({ patientId });

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching patient appointments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});






// Add more routes as needed

module.exports = router;