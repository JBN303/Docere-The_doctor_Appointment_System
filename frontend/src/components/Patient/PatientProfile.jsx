import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Modal, Box, Select, IconButton, LinearProgress } from '@mui/material';
import { TextField, MenuItem } from '@mui/material';
import { Label } from '@mui/icons-material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Loading from '../Doctor/Loading';
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
} from '@mui/material';

const PatientProfile = () => {
  const { id } = useParams();
  const [patientData, setPatientData] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({
    appno:'',
    patientName: '',
    age: '',
    date: '',
    day: 'Any',
    purpose: '',
    time:'',
    msg:'',
  });
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [noDoctorsFound, setNoDoctorsFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState('');
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
        const [patientResponse, doctorsResponse] = await Promise.all([
          axios.get(`http://localhost:5007/api/user/${id}`),
          axios.get('http://localhost:5007/api/doctors'),
        ]);

        setPatientData(patientResponse.data);
        setDoctors(doctorsResponse.data);
        setIsLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching patient data or doctors:', error);
        setIsLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, [id]);

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
      // Check if any field is empty
      console.log('Current appointmentDetails state:', appointmentDetails);
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

      const selectedDoctor = doctors.find((doctor) => doctor._id === doctorId);

      // Include patientId in the appointment details
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
        patientEmail: patientData.Email,
        patientContactNo: patientData.Phone,
      };
      
      // Send appointment details to the server
      const response = await axios.post(`http://localhost:5007/api/appointments/${doctorId}`, appointmentDetailsToSend);
  
      // Log the response or handle it as needed
      console.log('Appointment booked successfully:', response.data);
  
      // Clear appointment details and error after successful booking
      setAppointmentDetails({
        appno:'',
        patientName: '',
        age: '',
        date: '',
        day: 'any',
        purpose: '',
        time:'',
        msg:'',
      });
      setError('');
  
      alert("Appointment successful");
  
      handleCloseModal();
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  const handleSearch = (query) => {
    const filtered = doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDoctors(filtered);
    setNoDoctorsFound(filtered.length === 0);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {isLoading ? (
          <LinearProgress />
        ) : (
          <>
            <TextField
              label="Search Doctor"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => handleSearch(e.target.value)}
            />
            {noDoctorsFound && <Typography variant="h6">No doctors found.</Typography>}
            {patientData ? (
              <div>
                <Box sx={{ display: 'flex', marginTop: '20px', flexWrap: 'wrap' }}>
                  {(filteredDoctors.length ? filteredDoctors : doctors).map((doctor) => (
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
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </>
        )}
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
                Dr.{selectedDoctor.name}
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
              <Typography>Date:</Typography>
              <TextField
                type="date"
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
                  id="time"
                  label="Preferable Section"
                  name="day"
                  value={appointmentDetails.day}
                  onChange={handleInputChange}
                  style={{ width: '100%', marginBottom: '16px' }}
                >
                  <MenuItem value="Any">Any</MenuItem>
                  <MenuItem value="morning">Morning</MenuItem>
                  <MenuItem value="noon">Noon</MenuItem>
                  <MenuItem value="evening">Evening</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Purpose of Appointment"
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                margin="normal"
                name="purpose"
                value={appointmentDetails.purpose}
                onChange={handleInputChange}
              />
              <Button
                onClick={() => handleBookAppointment(selectedDoctor._id)}
                style={{ color: '#77d5cb' }}
              >
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

export default PatientProfile;
