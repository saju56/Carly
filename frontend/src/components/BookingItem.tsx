import React, {useContext, useEffect, useState} from 'react';
import {Booking} from "../model/Booking";
import Loader from "../utils/Loader";
import { Box, Button, Card, CardMedia, Grid, styled, Typography } from '@mui/material';
import { Context } from '../App';
import { properties } from '../resources/properties';
import { Car } from '../model/Car';

export interface BookingItemProps {
    booking: Booking;
    updateList: () => void;
}

const LeftText = styled(Typography)({
    textAlign: "left"
  });

const RightText = styled(Typography)({
    textAlign: "right"
  });

const BookingListItem: React.FC<BookingItemProps> = (props: BookingItemProps) => {
    const [deleting, setDeleting] = useState(false);
    const {token, setToken} = useContext(Context);
    const [currCar, setCurrCar] = useState<Car>();
    const [cost, setCost] = useState(0);
    const [dateFrom, setDateFrom] = useState<Number>();
    const [dateTo, setDateTo] = useState<Number>();

    const handleCancel = async (id: String) => {
        setDeleting(true);
            await fetch(`${properties.url}/logic/api/bookings/${id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((response) => {
              if (response.ok) return response.json()
              else throw new Error("ERROR " + response.status)
            }).then(() => {
              console.log("Success cancelling booking.")
            }).catch((e) => {
              console.log("Error when trying to cancel booking: " + e)
            }).finally(()=>{
              props.updateList();
            });
    }
    
    const getOneCar = async()=> {
        await fetch(`https://carly-backend-app.azurewebsites.net/logic/api/cars/${props.booking.carId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.ok) return response.json();
      else {
        throw new Error("ERROR " + response.status);
      }
    }).then((car) => {
      setCurrCar(car);
      console.log("Success fetching car.");
      let d_from = new Date(props.booking.startDate.substring(0, 10));
      let d_to = new Date(props.booking.endDate.substring(0, 10));
      let utc1 = Date.UTC(
        d_from.getFullYear(),
        d_from.getMonth(),
        d_from.getDate()
      );
      let _MS_PER_DAY = 1000 * 60 * 60 * 24;
      setDateFrom(utc1/_MS_PER_DAY);
      let utc2 = Date.UTC(
        d_to.getFullYear(),
        d_to.getMonth(),
        d_to.getDate()
      );
      setDateTo(utc2/_MS_PER_DAY);
      setCost((Math.floor(utc2 - utc1) / _MS_PER_DAY) * car.pricePerDay);
    }).catch((e) => {
      console.log("Error when trying to fetch car: " + e);
    });
    }
    const theme = {
        spacing: 8,
      }

    useEffect(() => {
        getOneCar();
    }, []);

    return (
        <Loader loading={deleting} label="Deleting">
            <Box sx={{ m: 1 }}>
                <Card>
                        <Grid container spacing={0} justifyContent="flex" display='flex'>
                            {/*Render the InnerGrid as a child item */}
                                <Grid item xs={3.5} sx={{m: 1}} direction="column" alignItems="bottom" justifyContent="center" display="flex">
                                    <CardMedia component="img"
                                                image={`${properties.url}/logic/api/cars/${props.booking.carId}/image2`}
                                                alt="Car photo"
                                                width="40px"
                                                ></CardMedia>
                                    <LeftText variant='h4' sx={{fontWeight: 'bold'}}>{currCar?.brand}</LeftText>
                                    <LeftText variant='h5'>{currCar?.model}</LeftText>
                                </Grid>
                                <Grid item xs={3.5} sx={{m: 1}} direction="column" alignItems="bottom" justifyContent="center" display="flex">
                                    <LeftText sx={{fontWeight: 'bold'}}>booking no. #{props.booking.id.substring(0,6)}</LeftText>  
                                    <LeftText>vin: {currCar?.vin}</LeftText>
                                    <LeftText>for: bookly</LeftText>
                                    <LeftText>from: {String(dateFrom)}</LeftText>
                                    <LeftText>to: {String(dateTo)}</LeftText>

                                </Grid>
                                <Grid item xs={3} sx={{m: 1}} direction="column" alignItems="bottom" justifyContent="center" display="flex">
                                    <LeftText variant='h4'>${cost}/booking</LeftText>
                                </Grid>
                                <Grid item xs={1} sx={{m: 1}}  direction="column" alignItems="bottom" justifyContent="center" display="flex">
                                    <Button 
                                    onClick={()=>handleCancel(props.booking.id)}
                                    color="inherit"
                                    disabled={false}
                                    size="small"
                                    variant="outlined"
                                    >cancel</Button>
                                </Grid>
                        </Grid>
                   
                </Card>
            </Box> 
        </Loader>
    );
}



export default BookingListItem;