import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container, CssBaseline, Paper, ThemeProvider, createTheme } from '@mui/material';
import styled from '@emotion/styled';

const theme = createTheme({
  palette: {
    primary: {
      main: '#77d5cb',
    },
  },
});

const CustomContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '300px',
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5007/api/login', {
        email: userEmail,
        cpass: userPassword,
      });
  
      const userId = response.data.userId;
  
      if (!userId) {
        console.error('User ID is undefined in the response');
        // Handle the error or redirect to an error page
        return;
      }
  
      // Fetch user details including status
      const userDetailsResponse = await axios.get(`http://localhost:5007/api/doctors/${userId}`);
      const userStatus = userDetailsResponse.data.status;
  
      console.log('Doctor Status:', userStatus); // Log doctor status
  
      if (userStatus === 'Inactive') {
        setError('Your account is inactive. Please contact with Docere303@gmail.com.');
      } else {
        // Redirect to the doctor's user page with their ID
        navigate(`/doctor/${userId}`); // Assuming the route is '/doctor/:userId'
      } // Assuming the route is '/doctor/:userId'
    } catch (err) {
      console.error('Error during login:', err); 
      if (err.response && err.response.status === 401) {
        setError('Incorrect email or password. Please try again.');
      } else {
        setError('An error occurred during login. Please try again later.');
      }
      // Handle the error, display a message, or redirect to an error page
    }
  };
  
 

  return (
    <ThemeProvider theme={theme}>
      <center>
      <CssBaseline />
      <CustomContainer component="main" maxWidth="xs">
        
          <Typography component="h1" variant="h5">
            Welcome Back!
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Login with your details to continue
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '16px' }}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="useremail"
              label="Email Address"
              name="useremail"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="userpassword"
              label="Password"
              name="userpassword"
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              required
            />
            {error && (
              <Typography variant="body2" style={{ color: 'rgb(255, 62, 62)', textAlign: 'center', marginTop: '10px' }}>
                {error}
              </Typography>
            )}
            <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '16px' }}>
              Login
            </Button>
            <Typography variant="body2" style={{ textAlign: 'center', marginTop: '10px' }}>
              Don't have an account? <a href="Signnav">Sign Up</a>
            </Typography>
          </form>
        
      </CustomContainer>
      </center>
    </ThemeProvider>
  );
};

export default Login;