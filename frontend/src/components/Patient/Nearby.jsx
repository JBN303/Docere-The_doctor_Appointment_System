import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Typography, Box, Modal, Card, CardContent ,Paper, IconButton, InputBase } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Select } from '@mui/material';
import { TextField, MenuItem} from '@mui/material';
import { useParams } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import Loading from '../Doctor/Loading';
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
} from '@mui/material';
import { LinearProgress } from '@mui/material';

const Nearby = () => {
  const { id } = useParams();
  const [patientData, setPatientData] = useState(null);
  const [pincode, setPincode] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [error, setError] = useState('');
  const [appointmentDetails, setAppointmentDetails] = useState({
    appno:'',
    patientName: '',
    age: '',
    date: '', // New input for date
    day: 'Any',
    purpose: '',
    time:'',
    msg:'',
  });
  const [isLoading, setIsLoading] = useState(true);
  const theme = createTheme({
    palette: {
      primary: {
        main: '#77d5cb', // Set your primary color
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading to true when starting data fetching

        // Fetch patient data
        const patientResponse = await axios.get(`http://localhost:5007/api/user/${id}`);
        setPatientData(patientResponse.data);

        // Fetch list of doctors
        const doctorsResponse = await axios.get('http://localhost:5007/api/doctors');
        setDoctors(doctorsResponse.data);

        setIsLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching patient data or doctors:', error);
        setIsLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, [id]);

  const handleSearch = () => {
    const filtered = doctors.filter((doctor) => doctor.pincode === pincode);
    setFilteredDoctors(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleOpenModal = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleBookAppointment = async (doctorId) => {
    try {
      if (
        appointmentDetails.patientName === '' ||
        appointmentDetails.age === '' ||
        appointmentDetails.date === '' ||
        appointmentDetails.day === 'any' ||
        appointmentDetails.purpose === ''
      ) {
        setError('Fill in all details.');
        return;
      }
      const appointmentDetailsToSend = {
        patientId: id,
        doctorId,
        appno: appointmentDetails.appno,
        patientName: appointmentDetails.patientName,
        age: appointmentDetails.age,
        date: appointmentDetails.date,
        day: appointmentDetails.day,
        purpose: appointmentDetails.purpose,
        time: appointmentDetails.time,
        msg: appointmentDetails.msg,
        doctorName: selectedDoctor.name,
        doctorLocation: selectedDoctor.location,
        patientEmail: patientData.Email, // Make sure patientData contains email
        patientContactNo: patientData.Phone, // Make sure patientData contains phone number
      };

      const response = await axios.post(`http://localhost:5007/api/appointments/${doctorId}`, appointmentDetailsToSend);

      console.log('Appointment booked successfully:', response.data);
      setAppointmentDetails({
        appno:'',
        patientName: '',
        age: '',
        date: '', //  New input for date
        day: 'any',
        purpose: '',
        time:'',
        msg:'',
      });
      
      alert("Appointment successful");
      
      handleCloseModal();
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        {isLoading && <LinearProgress />}
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, margin: 'auto' }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search by Pincode"
          inputProps={{ 'aria-label': 'search pincode' }}
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </Paper>
      {/* <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Typography variant="h5">Nearby Doctors</Typography>
      </Box> */}
      <Box sx={{ display: 'flex', marginTop: '20px', flexWrap: 'wrap' }}>
        {filteredDoctors.map((doctor) => (
         <Card key={doctor._id} sx={{ display: 'flex', margin: 2, width: 500 }}>
         <CardMedia
   component="img"
   sx={{ width: 181 }}
   image={`data:image/jpeg;base64,${doctor.profile}`}
   alt="Profile"
 />
 <Box sx={{ display: 'flex', flexDirection: 'column' }}>
   <CardContent sx={{ flex: '1 0 auto' }}>
     <Typography component="div" variant="h5">
       Dr.{doctor.name}
     </Typography>
     <Typography variant="body1" color="text.secondary">
     {doctor.gender},{doctor.age}
     </Typography>
     <Typography variant="body1" color="text.secondary">
       {doctor.qualification}
     </Typography>
     <Typography variant="body1" color="text.secondary">
       Specialty: {doctor.specialization}
     </Typography>
     <Typography variant="body1" color="text.secondary">
       Languages: {doctor.languages}
     </Typography>
   </CardContent>
   <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 2 }}>
     <Button onClick={() => handleOpenModal(doctor)} style={{ color: '#77d5cb' }}>
       Book Appointment
     </Button>
   </Box>
 </Box>
</Card>
        ))}
      </Box>
      {selectedDoctor && (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {selectedDoctor.name}
            </Typography>
            <TextField
              label="Patient Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="patientName"
              value={appointmentDetails.patientName}
              onChange={handleInputChange}
            />
            <TextField
              label="Age"
              variant="outlined"
              fullWidth
              margin="normal"
              name="age"
              value={appointmentDetails.age}
              onChange={handleInputChange}
            />
            <Typography>Date</Typography>
            <TextField
              
              type="date" // Input type for date
              variant="outlined"
              fullWidth
              margin="normal"
              name="date"
              value={appointmentDetails.date}
              onChange={handleInputChange}
            />
            <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel htmlFor="time">Preferable Section</InputLabel>
            <Select
              label="Preferable Section"
              name="day"
              value={appointmentDetails.day}
              onChange={handleInputChange}
              style={{ width: '100%', marginBottom: '16px' }}
            >
              <MenuItem value="morning">Any</MenuItem>
              <MenuItem value="morning">Morning</MenuItem>
              <MenuItem  value="noon">Noon</MenuItem >
              <MenuItem  value="evening">Evening</MenuItem >
            </Select>
            </FormControl>
            
            <TextField
              label="Purpose of Appointment"
              variant="outlined"
              fullWidth
              margin="normal"
              name="purpose"
              value={appointmentDetails.purpose}
              onChange={handleInputChange}
            />
            <Button onClick={() => handleBookAppointment(selectedDoctor._id)} style={{ color: '#77d5cb' }}>
              BOOK NOW
            </Button>
            {error && (
              <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>
                {error}
              </Typography>
            )}
          </Box>
        </Modal>
      )}
      </ThemeProvider>
    </div>
  );
};

export default Nearby;
