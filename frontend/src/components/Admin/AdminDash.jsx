import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import {  Typography,} from '@mui/material';

const AdminDash = () => {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [doctorSpecializations, setDoctorSpecializations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointmentsResponse = axios.get('http://localhost:5007/api/appointments');
        const doctorsResponse = axios.get('http://localhost:5007/api/doctors');
        const usersResponse = axios.get('http://localhost:5007/api/user');

        const [appointmentsData, doctorsData, usersData] = await Promise.all([
          appointmentsResponse,
          doctorsResponse,
          usersResponse,
        ]);

        setAppointments(appointmentsData.data);
        setDoctorsCount(doctorsData.data.length);
        setUserCount(usersData.data.length);

        // Process doctor specializations
        const specializationCounts = {};
        doctorsData.data.forEach((doctor) => {
          if (specializationCounts[doctor.specialization]) {
            specializationCounts[doctor.specialization]++;
          } else {
            specializationCounts[doctor.specialization] = 1;
          }
        });

        const specializations = Object.keys(specializationCounts).map((specialization) => ({
          specialization: specialization,
          count: specializationCounts[specialization],
        }));
        setDoctorSpecializations(specializations);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div sx={{ minWidth: 650 }}  style={{backgroundColor: 'white', minHeight: '100vh', padding: '70px'}}>
        
        <Typography component="h1" variant="h5">
            Docere Status
          </Typography>
          <br></br>
          <br></br>
          <br></br>
      <ResponsiveContainer width="50%" height={300} >
        <BarChart
          layout="vertical"
          data={[
            
            { name: 'Doctors', count: doctorsCount, fill: '#A569BD' },
            { name: 'Users', count: userCount, fill: '#EC7063' },
            { name: 'Session', count: appointments.length, fill: '#58D68D' },
          ]}
        >
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="count"  />
        </BarChart>
      </ResponsiveContainer>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Typography component="h1" variant="h5">Doctor Specializations</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={doctorSpecializations}
            dataKey="count"
            nameKey="specialization"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {doctorSpecializations.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getRandomColor()} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default AdminDash;
