
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import PreviewIcon from '@mui/icons-material/Preview';
import LogoutIcon from '@mui/icons-material/Logout'; 
import DashboardIcon from '@mui/icons-material/Dashboard';
import HealingIcon from '@mui/icons-material/Healing';
import Loading from '../Doctor/Loading';
import AdminDash from './AdminDash';
import DoctorList from './DoctorList';
import PatientView from './PatientView';
import { Dashboard } from '@mui/icons-material';

const drawerWidth = 240;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [selectedMenuItem, setSelectedMenuItem] = useState('Dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading time of 3 seconds
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3000 milliseconds = 3 seconds

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []);

  const navigateTo = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    // Clear session (example: remove token from local storage)
    localStorage.removeItem('adminToken');

    // Redirect to login page
    navigate('/admin', { replace: true });
  };
  const handleListItemClick = (text) => {
    setSelectedMenuItem(text);
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppBar position="fixed" sx={{ backgroundColor: '#77d5cb', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Admin Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>

        <List>
          {['Dashboard', 'Doctors List','Patients List'].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              onClick={() => handleListItemClick(text)}
              selected={selectedMenuItem === text}
            >
              <ListItemButton>
                <ListItemIcon>
                  {index % 3 === 0 ? <Dashboard /> : <PreviewIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        {/* <List>
          {[ 'Specialities', 'Common Symptoms'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
                  <List>
    {/* Logout button */}
    <ListItem button onClick={handleLogout}>
      <ListItemButton>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </ListItem>
  </List>
      </Box>
    </Drawer>
    <Box sx={{ flexGrow: 1, p: 3, background: 'white', minHeight: 1000 }}>
      <Toolbar />
      {/* Render content based on the selected menu item */}
      {selectedMenuItem === 'Dashboard' && (
        <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <AdminDash/>
        </Grid>
      </Grid>
        
      )}
      {/* Add similar conditionals for other menu items if needed */}
      {selectedMenuItem === 'Doctors List' && (
        <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <DoctorList/>
        </Grid>
      </Grid>
      )}

      {selectedMenuItem === 'Patients List' && (
        <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <PatientView/>
        </Grid>
      </Grid>
        
      )}
    </Box>
  </Box>
  );
}