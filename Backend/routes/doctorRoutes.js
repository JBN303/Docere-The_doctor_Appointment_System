const express = require('express');
const Doctor = require('../model/doctorModel');
const Appointment = require('../model/appointmentModel'); 
const router = express.Router();
const multer = require('multer');
const fs = require('fs');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination directory
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Specify the filename
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });


router.get('/doctors', async (req, res) => {
  try {
  
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/doctors/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const doctors = await Doctor.findById(id);
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/dnew', upload.fields([{ name: 'profile', maxCount: 1 }, { name: 'Certificate', maxCount: 1 }]), async (req, res) => {
  try {
    const {
      nmc,
      name,
      age,
      gender,
      experience,
      languages,
      location,
      pincode,
      specialization,
      qualification,
      profile,
      Certificate,
      about,
      phone,
      email,
      cpass
    } = req.body;
    
    // Create a newDoctorData object with all the fields
    const newDoctorData = {
      nmc,
      name,
      age,
      gender,
      experience,
      languages,
      location,
      pincode,
      specialization,
      qualification,
      profile,
      Certificate,
      about,
      phone,
      email,
      cpass,
      profile: req.files['profile'] ? await convertImageToBase64(req.files['profile'][0].path) : null, // Convert uploaded profile photo to base64 string
      Certificate: req.files['Certificate'] ? await convertImageToBase64(req.files['Certificate'][0].path) : null, // Convert uploaded certificate image to base64 string
    };
    
    if (req.files['profile']) {
      console.log('Received profile photo:', req.files['profile'][0]);
    } else {
      console.log('No profile photo received');
    }
    
    if (req.files['Certificate']) {
      console.log('Received certificate:', req.files['Certificate'][0]);
    } else {
      console.log('No certificate received');
    }

    const newDoctor = new Doctor(newDoctorData);
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (err) {
    res.status(500).send(err);
  }
});

async function convertImageToBase64(filePath) {
  try {
    const imageData = fs.readFileSync(filePath); // Read the uploaded file
    return imageData.toString('base64'); // Convert the image data to base64 string
  } catch (err) {
    console.error('Error converting image to base64:', err);
    throw err;
  }
}

// Route to upload profile picture
router.post('/doctors/upload-profile/:id', upload.single('profile'), async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const base64Image = await convertImageToBase64(req.file.path);
    doctor.profile = base64Image;
    await doctor.save();

    fs.unlinkSync(req.file.path);

    res.status(200).json({ message: 'Profile picture uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to upload certificate
router.post('/doctors/upload-Certificate/:id', upload.single('Certificate'), async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const base64Cert = await convertImageToBase64(req.file.path);
    doctor.Certificate = base64Cert;
    await doctor.save();

    fs.unlinkSync(req.file.path);

    res.status(200).json({ message: 'Certificate uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Update doctor profile
router.put('/updatedoctors/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the existing doctor document by ID
    const existingDoctor = await Doctor.findById(id);
    
    if (!existingDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Update only the fields that are present in req.body
    for (const key in req.body) {
      if (existingDoctor[key] !== req.body[key]) {
        existingDoctor[key] = req.body[key];
      }
    }

    // Save the updated doctor document
    const updatedDoctor = await existingDoctor.save();

    res.status(200).json(updatedDoctor);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete doctor profile
router.delete('/doctors/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(id);
    if (!deletedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
});


router.put('/doctors/toggle/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Toggle the status
    doctor.status = doctor.status === 'active' ? 'inactive' : 'active';

    const updatedDoctor = await doctor.save();

    res.status(200).json(updatedDoctor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/appointments/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    const { patientId, patientName, age, date, day, purpose , patientEmail, patientContactNo } = req.body;

    // Find selected doctor
    const selectedDoctor = await Doctor.findById(id);

    // Create a new appointment instance with additional details
    const appointment = new Appointment({
      doctorId: id,
      patientId,
      patientName,
      age,
      date,
      day,
      purpose,
      doctorName: selectedDoctor.name,
      doctorLocation: selectedDoctor.location,
      patientEmail, // Include patient email directly
      patientContactNo, 
    });

    const savedAppointment = await appointment.save();

    res.status(200).json(savedAppointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Update appointment status
router.put('/appointments/status/:appointmentId', async (req, res) => {
  const { appointmentId } = req.params;
  const { status } = req.body;

  try {
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, { status }, { new: true });
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.status(200).json(appointment);
  } catch (error) {
    console.error('Error updating appointment status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/appointments/:doctorId', async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.find({ doctorId });
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/appointmentpat/:patientId', async (req, res) => {
  
  
 
  try {
    const { patientId } = req.params;
    const appointments = await Appointment.find({ patientId });
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update appointment details
router.put('/appointments/:appointmentId', async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentId, req.body, { new: true });
    
    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Delete appointment
router.delete('/appointments/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
});


/// image 

router.post('/doctors/upload-profile/:id', upload.single('file'), async (req, res) => {
  console.log("hello");
  const { id } = req.params;

  try {
    const doctor = await Doctor.findById(id);
    console.log('Received doctor ID:', id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
  
    console.log(req.file);
    // Read th uploaded file
    const imageData = fs.readFileSync(req.file.path);

    // Convert the image data to base64 string
    const base64Image = imageData.toString('base64');

    // Update the doctor's profile picture field with the base64 string
    doctor.profile= base64Image;

    // Save the updated doctor object
    const updatedDoctor = await doctor.save();

    // Delete the temporary file
    fs.unlinkSync(req.file.path);

    res.status(200).json({ message: 'Profile picture uploaded successfully', doctor: updatedDoctor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/doctors/search', async (req, res) => {
  const { name, specialization, location } = req.query; // Extract query parameters
  
  try {
    let query = {}; // Initialize an empty query object
    
    // Check if name parameter is provided
    if (name) {
      query.name = { $regex: new RegExp(name, 'i') }; // Case-insensitive search for name
    }
    
    // Check if specialization parameter is provided
    if (specialization) {
      query.spec = { $regex: new RegExp(specialization, 'i') }; // Case-insensitive search for specialization
    }
    
    // Check if location parameter is provided
    if (location) {
      query.locat = { $regex: new RegExp(location, 'i') }; // Case-insensitive search for location
    }
    
    // Find doctors matching the query criteria
    const doctors = await Doctor.find(query);
    
    res.status(200).json(doctors);
  } catch (err) {
    console.error('Error searching doctors:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




module.exports = router;