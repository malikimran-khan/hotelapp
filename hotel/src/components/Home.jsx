import React from 'react';
import bg1 from './images/bg1.jpg'
import { Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const backgroundStyle = {
  backgroundImage: `url(${bg1})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '91vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  flexDirection: 'column', // Added to center text vertically
};

const contentContainer = {
  textAlign: 'center',
  maxWidth: '600px', // Added a maximum width for better readability
};

export default function Home() {
  return (
    <div style={backgroundStyle}>
      <div style={contentContainer}>
        <Typography variant='h5' sx={{ mb: 5, p: 3, color: 'black'   }}>
          Experience the epitome of hospitality and seamless hotel administration with our cutting-edge Hotel Management App. Designed to elevate your hotel's operational efficiency and provide an unparalleled guest experience, our application offers a comprehensive suite of features tailored to meet the unique demands of the hospitality industry.
        </Typography>
        <Typography variant='h4' sx={{ mb: 5, p: 3 }}>
          If you want to login, please click here <Button component={NavLink} to="/login" variant="contained">Login</Button>
        </Typography>
      </div>
    </div>
  );
}
