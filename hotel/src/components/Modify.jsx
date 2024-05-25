import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
export default function Modify() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/fetchdata");
        setData(response.data);
      } catch (error) {
        console.log("Error in fetching in front end", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (roomId) => {
    
    try {
      const response = await axios.delete(`http://localhost:8000/delete/${roomId}`);
        
      if (response.data.success) {
        setData((prevData) => prevData.filter((room) => room._id !== roomId));
        console.log("Record deleted successfully")
      } else {
        console.log(response.data.error);
        console.log("Record not delete")
      }
    } catch (error) {
      console.log("Error deleting records in front end", error);
    }
  };
  

  return (
    <>
      <Grid container spacing={2}>
        {data.map((room) => (
          <Grid item key={room._id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: 600, margin: 2 }}>
              <CardMedia
                component="img"
                height="440"
                image={`http://localhost:8000/images/${room.images}`}
                alt="Room"
              />
              <CardContent>
                <Typography variant="h5">Room Number: {room.number}</Typography>
                <Typography variant="h6">Room Price: {room.price}</Typography>
                <Typography variant="h6">Room Class: {room.roomclass}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Room Detail: {room.details}
                </Typography>
                <Button variant='contained' color='error' onClick={()=>handleDelete(room._id)}>Delete</Button>
                <Link to={`/update/${room._id}`}>
                <Button variant='contained' color='inherit' >Update</Button>

                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
