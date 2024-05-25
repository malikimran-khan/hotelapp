import styled from '@emotion/styled'
import { Button, FormControl, Input, InputLabel, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios  from 'axios'
import { Link } from 'react-router-dom'
const FieldContainer = styled.div`
margin-top: 20px;
display: flex;
flex-direction: column;
`
const Container = styled.form`
width: 50%;
margin: 5% auto 0 auto;
`;
export default function Insertdata() {
    const[number , setnumber]=useState("")
    const[price , setprice]=useState("")
    const[roomclass , setclass]=useState("")
    const[details , setdetails] = useState("")
    const[images , setimages]=useState(null)
    const HandleSubmit = async(e)=>{
        e.preventDefault()
        const formdata = new FormData()
        formdata.append("file-upload" , images);
        try{
              console.log(images)
              const response = await axios.post(
                "http://localhost:8000/multer",
                formdata
              );
              if(response.data.name)
              {
                console.log({details:details, price:price, roomclass: roomclass, number: number, images:response.data.name});
                 const responseData = await axios.post(
                  "http://localhost:8000/insertdata" ,
                  ({details:details, price:price, roomclass: roomclass, number: number, images:response.data.name})
                 );
                 console.log(responseData.data)
                 setnumber("");
                 setprice("");
                 setclass("");
                 setdetails("");
                 setimages(null);
              }
        }catch(error)
        {
          console.log("Error in inserting in front end" ,error);
        }

  }
  return (
    <>
      <Container onSubmit={HandleSubmit}>
        <Typography variant='h3' sx={{marginLeft:32}}>Insert Data</Typography>
        <FieldContainer>
          <FormControl>
            <InputLabel>Enter room number</InputLabel>
            <Input required name='number' onChange={(e)=>setnumber(e.target.value)}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <InputLabel>Enter room price</InputLabel>
            <Input required name='price' onChange={(e)=>setprice(e.target.value)}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <InputLabel>Enter room class</InputLabel>
            <Input required name='roomclass' onChange={(e)=>setclass(e.target.value)}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <InputLabel>Enter room detail</InputLabel>
            <Input required name='details' onChange={(e)=>setdetails(e.target.value)}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <InputLabel>Select image</InputLabel>
            <Input required type='file' name='images' onChange={(e)=>setimages(e.target.files[0])}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <Button variant="contained" type="submit" sx={{ mt: 3 }}>Save Data</Button>
          </FormControl>
        </FieldContainer>

      </Container>
      <Link to='/modify'>Modify</Link>
    </>
  )
}
