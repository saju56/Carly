import React, {useState} from 'react';
import {Booking} from "../model/Booking";
import Loader from "../utils/Loader";
import { updateCommaList } from 'typescript';
import { Box, Button, Card, CardMedia, Grid, makeStyles, styled, Typography } from '@mui/material';



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
    
    const deleteHandle = () => {
        setDeleting(true);
        //deleteCar(props.booking.id)
         //   .then(()=>props.updateList())
          //  .catch(e=>console.error(JSON.stringify(e)))
           // .finally(()=>setDeleting(false))
    }
    
    const theme = {
        spacing: 8,
      }

    return (
        <Loader loading={deleting} label="Deleting">
            <Box sx={{ m: 1 }}>
                <Card>
                        <Grid container spacing={0} justifyContent="flex" display='flex'>
                            {/*Render the InnerGrid as a child item */}
                                <Grid item xs={3.5} sx={{m: 1}} direction="column" alignItems="bottom" justifyContent="center" display="flex">
                                    <CardMedia component="img"
                                                //image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2018-rolls-royce-phantom-1536152159.png?crop=1.00xw:1.00xh;0,0&resize=980:*"
                                                alt="Car photo"
                                                width="40px"
                                                ></CardMedia>
                                    <LeftText variant='h4' sx={{fontWeight: 'bold'}}>{props.booking.id}</LeftText>
                                    <LeftText variant='h5'>{props.booking.id}</LeftText>
                                </Grid>
                                <Grid item xs={3.5} sx={{m: 1}} direction="column" alignItems="bottom" justifyContent="center" display="flex">
                                    <LeftText sx={{fontWeight: 'bold'}}>booking no. {props.booking.id}</LeftText>  
                                    <LeftText>vin: {props.booking.id}</LeftText>
                                    <LeftText>for: {props.booking.id} {props.booking.id}</LeftText>
                                    <LeftText>from: {props.booking.id}</LeftText>
                                    <LeftText>to: {props.booking.id}</LeftText>

                                </Grid>
                                <Grid item xs={3} sx={{m: 1}} direction="column" alignItems="bottom" justifyContent="center" display="flex">
                                    <LeftText variant='h4'>${props.booking.id}/booking</LeftText>
                                </Grid>
                                <Grid item xs={1} sx={{m: 1}}  direction="column" alignItems="bottom" justifyContent="center" display="flex">
                                    <Button 
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