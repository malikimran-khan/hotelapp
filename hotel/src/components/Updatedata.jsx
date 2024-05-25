import styled from '@emotion/styled'
import { Button, FormControl, Input, InputLabel, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
const FieldContainer = styled.div`
margin-top: 20px;
display: flex;
flex-direction: column;
`
const Container = styled.form`
width: 50%;
margin: 5% auto 0 auto;
`;
export default function Updatedata() {
  const {id} = useParams()
  const navigate = useNavigate()
  const[formdata , setformdata] = useState({
    number: '',
    price: '',
    roomclass: '',
    details: '',
    image: null,
  })
  useEffect(()=>{
    const fetchRoomData = async()=>{
      try{
                  const response = await axios.get(`http://localhost:8000/fetchdata/${id}`)
                  const room = response.data
                  setformdata({
                    number:room.number,
                    price:room.price,
                    roomclass:room.roomclass,
                    details:room.details,
                  })
      }catch(error)
      {
           console.log("Error in updatind data" , error)
      }
    }
    fetchRoomData()
  },[id])
  const HandleSubmit = async(e)=>{
    e.preventDefault()
    try{
          const formDataToUpdate = new FormData()
          formDataToUpdate.append('number' , formdata.number)
          formDataToUpdate.append('price' , formdata.price)
          formDataToUpdate.append('roomclass' , formdata.roomclass)
          formDataToUpdate.append('details' , formdata.details)
          formDataToUpdate.append('image' , formdata.image)
          await axios.put(`http://localhost:8000/update/${id}` , formDataToUpdate);
          console.log("Data Updated successfully")
          navigate('/modify')

    }catch(error)
    {
      console.log("Error updating data in front end" , error)
    }
  }
const handleInputChange = (e) =>{
  const{name , value , type} = e.target
  setformdata((preData)=>({
    ...preData,
    [name] : type === 'file' ? e.target.files[0] : value
  }))
}
  return (
    <>
      <Container onSubmit={HandleSubmit}>
        <Typography variant='h3' sx={{alignItems:'center' , textAlign:'center'}}> Update Data</Typography>
        <FieldContainer>
          <FormControl>
            <InputLabel>Update Room Number</InputLabel>
            <Input name='number' type='text' value={formdata.number} onChange={handleInputChange}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <InputLabel>Update Room price</InputLabel>
            <Input name='price' type='text' value={formdata.price} onChange={handleInputChange}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <InputLabel>Update Room Class</InputLabel>
            <Input name='class' type='text' value={formdata.roomclass} onChange={handleInputChange}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <InputLabel>Update Room Details</InputLabel>
            <Input name='details' type='text' value={formdata.details} onChange={handleInputChange}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            <InputLabel>Update Image</InputLabel>
            <Input name='image' type='file'  onChange={handleInputChange}></Input>
          </FormControl>
        </FieldContainer>
        <FieldContainer>
          <FormControl>
            
            <Button variant='contained' type='submit'>Update data</Button>
          </FormControl>
        </FieldContainer>
      </Container>
    </>
  )
}
