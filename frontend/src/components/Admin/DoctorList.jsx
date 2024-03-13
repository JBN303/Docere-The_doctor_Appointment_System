import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import Loading from '../Doctor/Loading';


const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleStatus = async (id) => {
    try {
      await axios.put(`http://localhost:5007/api/doctors/toggle/${id}`);
      // Refresh the doctor list after toggling the status
      const response = await axios.get('http://localhost:5007/api/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    axios.get('http://localhost:5007/api/doctors')
      .then(response => setDoctors(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    
    <div>
      
        <Toolbar>
        
          <Typography variant="h6" component="div">
            Doctor List
          </Typography>
        </Toolbar>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="doctor table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>NMC UID</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Profile Photo</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Doctor Name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Age</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Gender</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Language</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Qualification</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>specialization</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Location</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Pincode</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Certificate</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>About</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Mobile Number</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}> Password</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}> Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map(doctor => (
              <TableRow key={doctor._id}>
                <TableCell style={{ fontWeight: 'bold' }}>{doctor.status === 'active' ? 'Active' : 'Inactive'}</TableCell>
                <TableCell>{doctor.nmc}</TableCell>
                <TableCell>{doctor.profile && <img src={`data:image/jpeg;base64,${doctor.profile}`} alt="Profile" style={{ width: '50px', height: '50px' }} />}</TableCell>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>{doctor.age}</TableCell>
                <TableCell>{doctor.gender}</TableCell>
                <TableCell>{doctor.languages}</TableCell>
                <TableCell>{doctor.qualification}</TableCell>
                <TableCell>{doctor.specialization}</TableCell>
                
                
                <TableCell>
                    <a href={doctor.location} target="_blank" rel="noopener noreferrer">
                      View Location
                    </a>
                  </TableCell>
                <TableCell>{doctor.pincode}</TableCell>
  
                <TableCell> {doctor.Certificate && <img src={`data:image/jpeg;base64,${doctor.Certificate}`} alt="Certificate" style={{ width: '50px', height: '50px' }} />}</TableCell>
                
                <TableCell>{doctor.about}</TableCell>
                <TableCell>{doctor.phone}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>
  {/* Display dots instead of the actual password */}
  {Array(doctor.cpass.length).fill('*').join('')}
</TableCell>
                <TableCell>
                  
                <Button
                    
                    
                    startIcon={<ToggleOnOutlinedIcon />} style={{ color: '#77d5cb' }}
                    onClick={() => toggleStatus(doctor._id)}
                  >
                    
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    
  );
};

export default DoctorList;
