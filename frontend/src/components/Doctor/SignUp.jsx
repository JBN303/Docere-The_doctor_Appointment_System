import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Paper,
  TextareaAutosize,
  Grid,
  Container,
} from '@mui/material';
import styled from '@emotion/styled';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FolderIcon from '@mui/icons-material/Folder';
import Avatar from '@mui/material/Avatar';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';

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
  marginTop: '65px',
  backgroundColor: '#fff',
  
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

function SignUp() {
  const [inputs, setInputs] = useState({
    nmc: '', // Change 'uid' to 'nmc'
    name: '',
    age: '',
    gender: '', // Change 'type' to 'gender'
    experience: '', // Change 'exp' to 'experience'
    languages: [], // Change 'lang' to 'languages'
    location: '',
    pincode: '', // Change 'conslt' to 'pincode'
    specialization: '',
    qualification: [], // Change 'edu' to 'qualification'
    profile: '',
    Certificate: '',
    phone: '', // Change 'phn' to 'phone'
    email: '',
    cpass: '',
    about: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState(null); 
  const [previewCert, setPreviewCert] = useState(null); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const InputHandler = (event) => {
    const {name,value} = event.target
    setInputs((inputs) => ({...inputs,[name]:value}))
    console.log(inputs)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

// Add FormData to handle file uploads
const SaveData = () => {
  // Check if any required field is empty
  const requiredFields = ['nmc', 'name', 'age', 'gender', 'experience', 'languages', 'location', 'pincode', 'specialization', 'qualification', 'profile', 'Certificate', 'phone', 'email', 'cpass'];
  const missingFields = requiredFields.filter(field => !inputs[field]);

  if (missingFields.length > 0) {
    setError('Fill all details'); // Set error message
    return;
  }

  setError(null); // Clear error message if all fields are filled

  const formData = new FormData();

  // Append all fields to formData
  Object.entries(inputs).forEach(([key, value]) => {
    formData.append(key, value);
  });

  axios.post("http://localhost:5007/api/dnew", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then((response) => {
      alert("Record Saved successfully");
      navigate('/login');
    })
    .catch(err => console.log(err));
};
const handleProfilePhotoChange = (event) => {
  const file = event.target.files[0];
  setInputs((inputs) => ({ ...inputs, profile: file }));

  // Display the selected profile photo
  const reader = new FileReader();
  reader.onload = (e) => {
    setPreviewPhoto(e.target.result);
  };
  reader.readAsDataURL(file);
};

const handleCertificateChange = (event) => {
  const file = event.target.files[0];
  setInputs((inputs) => ({ ...inputs, Certificate: file }));

  // Display the selected certificate
  const reader = new FileReader();
  reader.onload = (e) => {
    setPreviewCert(e.target.result);
  };
  reader.readAsDataURL(file);
};

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <center>
      <CustomContainer component="main" maxWidth="xs">
        
        <Paper elevation={3} style={{ padding: '20px', width: '800px' }}>
          <Typography variant="h5" align="center">
            Let's Get Started
          </Typography>
          <Typography variant="subtitle1" align="center">
            It's Okay, Now Create doctor's Account.
          </Typography>
          <br></br>
          <form>
          <Grid container spacing={2}>
              <Grid item xs={6}>
              <TextField
  fullWidth
  label="NMC UID"
  name="nmc" // Change 'uid' to 'nmc'
  type="number"
  placeholder="ex:1757"
  onChange={InputHandler}
  value={inputs.nmc}
  margin="normal"
  InputProps={{
    pattern: '[0]{1}[0-9]{9}',
  }}
/>
              </Grid>
<Grid item xs={6}>
  <TextField
    fullWidth
    label="Full Name"
    name="name"
    placeholder="Enter your full name"
    onChange={InputHandler}
    value={inputs.name}
    margin="normal"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Typography variant="body1">DR.</Typography>
        </InputAdornment>
      ),
    }}
  />
</Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  type="number"
                  placeholder=""
                  onChange={InputHandler}
                  value={inputs.age}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
  <FormControl fullWidth margin="normal">
    <InputLabel>Gender</InputLabel>
    <Select
      name="gender" // Change 'type' to 'gender'
      label="Gender"
      value={inputs.gender}
      onChange={InputHandler}
    >
      <MenuItem value="Male">Male</MenuItem>
      <MenuItem value="Female">Female</MenuItem>
      <MenuItem value="Both">Others</MenuItem>
    </Select>
  </FormControl>
</Grid>

<Grid item xs={6}>
  <TextField
    fullWidth
    label="Experience"
    name="experience" // Change 'exp' to 'experience'
    placeholder="in years"
    onChange={InputHandler}
    value={inputs.experience}
    margin="normal"
  />
</Grid>

<Grid item xs={6}>
  <FormControl fullWidth margin="normal">
    <InputLabel>Languages Known</InputLabel>
    <Select
      name="languages" // Change 'lang' to 'languages'
      label="Languages Known"
      value={inputs.languages}
      onChange={(event) => setInputs({ ...inputs, languages: event.target.value })}
      multiple
      displayEmpty
      renderValue={(selected) => (selected.length === 0 ? '' : selected.join(', '))}
    >
      {['English', 'Hindi', 'Malayalam', 'Tamil', 'Arabic'].map((language) => (
        <MenuItem key={language} value={language}>
          <Checkbox checked={inputs.languages.includes(language)} />
          {language}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Grid>

<Grid item xs={6}>
  <TextField
    fullWidth
    label="Location"
    name="location" // Change 'locat' to 'location'
    placeholder="exact Google Map Link"
    onChange={InputHandler}
    value={inputs.location}
    margin="normal"
  />
</Grid>

<Grid item xs={6}>
  <TextField
    fullWidth
    label="Pincode"
    name="pincode" // Change 'conslt' to 'pincode'
    placeholder=""
    onChange={InputHandler}
    value={inputs.pincode}
    margin="normal"
  />
</Grid>
<Grid item xs={6}>
  <FormControl fullWidth margin="normal">
    <InputLabel>Specialization</InputLabel>
    <Select
      name="specialization"
      label="Specialization"
      value={inputs.specialization}
      onChange={InputHandler}
    >
      <MenuItem value="General Physician">General Physician</MenuItem>
      <MenuItem value="Psychiatrist">Psychiatrist</MenuItem>
      <MenuItem value="Pediatricians">Pediatricians</MenuItem>
      <MenuItem value="Cardiologist">Cardiologist</MenuItem>
      <MenuItem value="Oncologists">Oncologists</MenuItem>
      <MenuItem value="ENT Specialist">ENT Specialist</MenuItem>
      <MenuItem value="Dentists">Dentists</MenuItem>
    </Select>
  </FormControl>
</Grid>

<Grid item xs={6}>
  <FormControl fullWidth margin="normal">
    <InputLabel>Qualifications</InputLabel>
    <Select
      name="qualification"
      label="Qualifications"
      value={inputs.qualification}
      onChange={(event) => setInputs({ ...inputs, qualification: event.target.value })}
      multiple
      displayEmpty
      renderValue={(selected) => (selected.length === 0 ? '' : selected.join(', '))}
    >
      {['MBBS', 'MD', 'MS', 'Diploma', 'PhD', 'Other'].map((qualification) => (
        <MenuItem key={qualification} value={qualification}>
          <Checkbox checked={inputs.qualification.includes(qualification)} />
          {qualification}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Grid>

<Grid item xs={6}>
  <TextField
    fullWidth
    label="Profile"
    name="profile"
    type="file"
    onChange={handleProfilePhotoChange} // Assuming this function is defined in your component
    margin="normal"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          {previewPhoto ? (
            <Avatar alt="Profile Photo" src={previewPhoto} />
          ) : (
            <Avatar>☺</Avatar>
          )}
        </InputAdornment>
      ),
    }}
  />
</Grid>

<Grid item xs={6}>
  <TextField
    fullWidth
    label="Certificate"
    name="Certificate"
    type="file"
    onChange={handleCertificateChange} // Assuming this function is defined in your component
    margin="normal"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          {previewCert ? (
            <Avatar alt="Certificate" src={previewCert} />
          ) : (
            <FolderIcon />
          )}
        </InputAdornment>
      ),
    }}
  />
</Grid>


<Grid item xs={6}>
  <TextField
    fullWidth
    label="Phone"
    name="phone"
    type="number"
    placeholder="ex: 9712345678"
    value={inputs.phone}
    onChange={InputHandler}
    margin="normal"
    InputProps={{
      pattern: '[0]{1}[0-9]{9}',
    }}
  />
</Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={inputs.email}
                  onChange={InputHandler}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Create New Password"
                  name="npass"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New Password"
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="cpass"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={inputs.cpass}
                  onChange={InputHandler}
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextareaAutosize
                  name="about"
                  className="input-text"
                  placeholder="Details about the you"
                  onChange={InputHandler}
                  value={inputs.about}
                  style={{ width: '100%', minHeight: '50px', margin: '10px 0' }}
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={SaveData}
              style={{ marginTop: '20px' }}
            >
              Sign Up
            </Button>
            {error && (
          <Typography variant="body2" color="error" align="center" style={{ marginTop: '10px' }}>
            {error}
          </Typography>
        )}
            <Typography variant="subtitle1" align="center">
            Already have an account?<a href="login">
                    Login
                  </a>
          </Typography>
          </form>

        </Paper>
        </CustomContainer>
      </center>
    </ThemeProvider>
  );
}

export default SignUp;
