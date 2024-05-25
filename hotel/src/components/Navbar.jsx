import React from 'react'
import Box from '@mui/material/Box';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <Box sx={{display:'flex'}}>
        <AppBar sx={{background:'#111111'}} position='static'>
            <Toolbar>
                <Typography variant='h5'>Hotel Managment App</Typography>
                <div>
                <Button component={Link} sx={{pl:5}} to="/" variant="text" color='inherit'>Home</Button>
             <Button component={Link} sx={{pl:5}} to="/login"  variant='text' color='inherit'>Login</Button>
                    <Button  component={Link} sx={{pl:5}} to="/signup" variant='text' color='inherit'>Signup</Button>
                    <Button component={Link} sx={{pl:5}} to="/admin" variant='text' color='inherit'>Admin</Button>

                </div>
            </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}
