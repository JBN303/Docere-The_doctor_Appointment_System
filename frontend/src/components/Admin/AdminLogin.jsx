import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { styled } from '@mui/system';
import { Center } from '@mui/system';
import logo from './docere.png'

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

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5007/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.status === 200) {
        // Successful login, redirect to admin dashboard
        navigate('/admindashboard');
      } else if (response.status === 401) {
        // Invalid credentials, show error message
        setErrorMessage('Invalid Admin username or password');
      } else {
        // Handle other status codes if needed
        // ...
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle network errors or other exceptions
      // ...
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <center>
      <CustomContainer component="main" maxWidth="xs" >
      
        <CssBaseline />
        <Typography variant="h5" color="textPrimary">
          Admin Login
        </Typography>
        <form>
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              style: { backgroundColor: '#fff' },
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              style: { backgroundColor: '#fff' },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            sx={{ marginTop: '1rem' }}
          >
            Login
          </Button>
          {errorMessage && (
            <Typography color="error" sx={{ marginTop: '1rem' }}>
              {errorMessage}
            </Typography>
          )}
        </form>
        
      </CustomContainer>
      </center>
    </ThemeProvider>
  );
};

export default AdminLogin;