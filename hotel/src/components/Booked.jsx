import styled from '@emotion/styled';
import { Box, Button, Card, CardContent, CardMedia, Grid, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FieldContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const Container = styled.form`
  width: 80%; /* Adjust the width of the form */
  margin: 5% auto 0 auto;
`;

export default function Booked() {
  const { id } = useParams();
  const [data, setdata] = useState({
    number: '',
    price: '',
    roomclass: '',
    details: '',
    image: null,
  });
  const[openmodel , sertopenmodel]=useState(false)
  const[selectDate , setselectDate]=useState(null)
  const[selectedtime , setselectedtime]=useState(null)
  const[isbooked , setisbooked] = useState(false)

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/fetchdata/${id}`);
        const room = response.data;
        setdata({
          number: room.number,
          price: room.price,
          roomclass: room.roomclass,
          details: room.details,
          image: room.images,
        });
        setisbooked(room.isbooked)
      } catch (error) {
        console.log("Error in Booked room", error);
      }
    };
    fetchdata();
  }, [id]);
  const handleBookNow = () => {
    sertopenmodel(true);
  };

  const handleCloseModal = () => {
    sertopenmodel(false);
  };

  const handleConfirmBooking = () => {
    // Handle the booking confirmation with selectedDate and selectedTime
    console.log("Booking Confirmed:", selectDate , selectedtime);
    sertopenmodel(false);
    setisbooked(true)
  };
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item key={data.id} xs={12} sm={6} md={8} lg={6}>
            <Card sx={{ maxWidth: '100%', height: '100%', margin: 2 }}>
              <CardMedia>
                {data.image && (
                  <img
                    src={`http://localhost:8000/images/${data.image}`}
                    alt={`Room ${data.number}`}
                    style={{ width: '100%', height: 'auto' }}
                  />
                )}
                <CardContent>
                  <Typography variant='h6'>Room Number: {data.number}</Typography>
                  <Typography>Room Price: {data.price}</Typography>
                  <Typography>Room Class: {data.roomclass}</Typography>
                  <Typography>Room Details: {data.details}</Typography>
                </CardContent>
                {isbooked ? (
                     <Button variant='contained' style={{ backgroundColor: 'red' }}>
                     Already Booked{selectDate}
                   </Button>
                ) : (
                    <Button variant='contained' onClick={handleBookNow}>
                    {isbooked ? 'Already Booked' : 'Book Now'}
                  </Button>
                )}
              </CardMedia>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Modal open={openmodel} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <Typography variant="h6" component="h2">Select Date and Time</Typography>
            <TextField
            id="date"
            label="Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            onChange={(e) => setselectDate(e.target.value)}
          />
            <TextField
            id="time"
            label="Time"
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            onChange={(e) => setselectedtime(e.target.value)}
          />
            <Button variant="contained" onClick={handleConfirmBooking}>
            Confirm Booking
          </Button>
        </Box>
      </Modal>
    </>
  );
}
