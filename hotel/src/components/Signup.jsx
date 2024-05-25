import styled from '@emotion/styled';
import { Button, FormControl, Input, InputLabel, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
const FieldContainer = styled.div`
margin-top: 20px;
display: flex;
flex-direction: column;
`
const Container = styled.form`
width: 50%;
margin: 5% auto 0 auto;
`;
export default function Signup() {
  const[name , setname] = useState("")
  const[email , setemail] = useState("")
  const[password , setpassword] = useState("")
  const[confirmpassword , setconfirmpassword] = useState("")
  const navigate = useNavigate()
  const HandleSubmit=async(e)=>{
    e.preventDefault()
       axios.post("http://localhost:8000/register" ,{name , email , password , confirmpassword})
       .then((result)=>{
        console.log("SignUp Successfully")
        navigate("/home1")
       }).catch((error)=>{
        console.log("Error during signup in front end" , error)
       })
  }
  return (
    <>
      <Container onSubmit={HandleSubmit}>
        <Typography variant='h3' sx={{ alignItems: 'center', textAlign: 'center' }}>SignUp Form</Typography>
        <FieldContainer>
          <FormControl>
            <InputLabel>Enter Your Name</InputLabel>
            <Input required name='name' onChange={(e)=>setname(e.target.value)}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <InputLabel>Enter Your Email</InputLabel>
            <Input required name='email' onChange={(e)=>setemail(e.target.value)}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <InputLabel>Enter Your Password</InputLabel>
            <Input required name='password' onChange={(e)=>setpassword(e.target.value)}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <InputLabel>Enter Your Name</InputLabel>
            <Input required name='confirmpassword' onChange={(e)=>setconfirmpassword(e.target.value)}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <Button sx={{mt:5}} variant='contained' type='submit'>Submit</Button>
          </FormControl>
        </FieldContainer>
        <Typography variant='h4' sx={{ mb: 5, p: 3 }}>
          If you have already account -- <Button component={NavLink} to="/login" variant="text">Login</Button>
        </Typography>
      </Container>
    </>
  )
}
