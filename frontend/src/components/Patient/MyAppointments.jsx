import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Loading from '../Doctor/Loading';

const MyAppointments = () => {
  const { id } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:5007/api/appointmentpat/${id}`);
        setAppointments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [id]);

  //delete appoinments 
  const handleDeleteAppointment = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:5007/api/appointments/${appointmentId}`);
      // Filter out the deleted appointment from the appointments array
      setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment._id !== appointmentId));
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  return (
    <div style={{ background: 'white' }}>
      
      {loading ? (
        <p>Loading appointments...</p>
      ) : (
        <div>
          {appointments.map(appointment => (
            <Card key={appointment._id} sx={{ minWidth: 275, margin: 2 }}>
              <CardContent>
              <Typography sx={{ fontSize: 14, color: appointment.status === 'pending' ? '#FFC300' : '#28B463' }} gutterBottom>
                  Appointment {appointment.status}
                </Typography>
                <Typography variant="h5" component="div">
                  Dr.{appointment.doctorName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Appointment no: {appointment.appno}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Appointment Date: {appointment.date}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Appointment time : {appointment.time}
                </Typography>
                <Typography variant="body2">
                   {appointment.msg}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href={appointment.doctorLocation} target="_blank" rel="noopener noreferrer">
                ╰┈➤ Get Direction
                    </Button>
                    <Typography>
                    <IconButton onClick={() => handleDeleteAppointment(appointment._id)} aria-label="delete">
      <DeleteIcon />
    </IconButton>
    </Typography>
              </CardActions>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
