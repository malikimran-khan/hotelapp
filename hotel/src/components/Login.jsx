import styled from '@emotion/styled';
import { Button, FormControl, Input, InputLabel, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
const FieldContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;
const Container = styled.form`
  width: 50%;
  margin: 5% auto 0 auto;
`;
export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:8000/login", { email, password });

      if (result.data.success) {
        console.log("Login successful");
        navigate("/home1");
      } else {
        console.log("Login failed");
        setErrorMessage("Please enter correct email and password");
      }
    } catch (error) {
      console.log("Error in login in frontend", error);
      setErrorMessage("Please enter correct email and password");
    }
  };
  return (
    <>
      <Container onSubmit={HandleSubmit}>
        <Typography variant='h3' sx={{ alignItems: 'center', textAlign: 'center' }}>Login Form</Typography>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        <FieldContainer>
          <FormControl>
            <InputLabel>Enter Your Email</InputLabel>
            <Input required name='email' onChange={(e) => setemail(e.target.value)} />
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <InputLabel>Enter Your Password</InputLabel>
            <Input required name='password' type="password" onChange={(e) => setpassword(e.target.value)} />
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <Button variant='contained' type='submit' sx={{ mt: 5 }}>Login</Button>
          </FormControl>
        </FieldContainer>
        <Typography variant='h4' sx={{ mb: 5, p: 3 }}>
          If you have no account <Button component={NavLink} to="/signup" variant="text">Signup</Button>
        </Typography>
      </Container>
    </>
  );
}
