import styled from '@emotion/styled'
import { Button, FormControl, Input, InputLabel, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Container = styled.form`
width : 50%;
margin:5% auto 0 auto;
& > div {
    margin-top: 20px;
  display : flex;
}
`
export default function Admin() {
    const[email , setemail] = useState("")
    const[password , setpassword] = useState("")
    const[errormassage , seterrormassage] =  useState("")
    const navigate = useNavigate()
    const Handlesubmit=(e)=>{
       if(email === "imran89@gmail.com" && password==="1234")
       {
        console.log("Login successful")
        navigate("/insertdata")
       }else{
             seterrormassage("Please enter correct email and password")
       }
    }
  return (
    <>
    <Container onSubmit={Handlesubmit}>
        <Typography variant='h3' sx={{marginLeft:32}}>Admin Form</Typography>
        <FormControl sx={{mt:5}}>
            <InputLabel>Enter your email</InputLabel>
            <Input required name='email' onChange={(e)=>setemail(e.target.value)}></Input>
        </FormControl>
        <FormControl sx={{mt:3}}>
            <InputLabel>Enter your email</InputLabel>
            <Input required name='password' onChange={(e)=>setpassword(e.target.value)}></Input>
        </FormControl>
        <FormControl sx={{pt:3}}>
            <Button type='submit' variant='contained'>Submit</Button>
        </FormControl>
        {errormassage && (
            <Typography variant='body2' sx={{color : 'red' , mt: 2}}>
            {errormassage}
            </Typography>
        )}
    </Container>
    </>
  )
}
