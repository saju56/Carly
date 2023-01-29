import React, {useState} from 'react';
import {Car} from "../model/Car";
import Loader from "../utils/Loader";
import { updateCommaList } from 'typescript';
import { Box, Button, Card, CardMedia, Grid, makeStyles, styled, TextField, Typography } from '@mui/material';



export interface CarItemProps {
    car: Car;
    updateList: () => void;
}

const LeftText = styled(Typography)({
    textAlign: "left"
  });

const RightText = styled(Typography)({
    textAlign: "right"
  });

const CarItem: React.FC<CarItemProps> = (props: CarItemProps) => {
    const [deleting, setDeleting] = useState(false);
    const [editing, setEditing] = useState(false);
    const [currentCar, setCurrentCar] = useState(props.car);
    const theme = {
        spacing: 8,
      }
    
    const editHandle = () => {
        setEditing(true);
        console.log(currentCar)
    }

    const cancelHandle = () => {
        setEditing(false);
        console.log(currentCar);

    }

    const saveHandle = () => {
        
    }

    const deleteHandle = () => {
        setDeleting(true);
       // deleteCar(props.car.id)
       //     .then(()=>props.updateList())
        //    .catch(e=>console.error(JSON.stringify(e)))
         //   .finally(()=>setDeleting(false))
    }
    
    return (
        <Loader loading={deleting} label="Deleting">
            {editing ? 
            <Box sx={{ m: 1 }}>
                <Card>
                        <Grid container spacing={0} display='flex'>
                            {/*Render the InnerGrid as a child item */}
                                <Grid item xs={3.5} sx={{m: 1}} direction="column" alignItems="bottom" justifyContent="center" display="flex">
                                    <CardMedia component="img"
                                                //image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2018-rolls-royce-phantom-1536152159.png?crop=1.00xw:1.00xh;0,0&resize=980:*"
                                                alt="Car photo"
                                                width="40px"
                                                ></CardMedia>
                                    <LeftText ><TextField
                                                        hiddenLabel
                                                        id="filled-hidden-label-small"
                                                        defaultValue={props.car.brand}
                                                        variant="filled"
                                                        size="small"
                                                        onChange={(e)=>{
                                                            setCurrentCar({
                                                                ...currentCar,
                                                                brand: e.target.value
                                                            })
                                                        }}
                                                        /></LeftText>
                                    <LeftText><TextField
                                                        hiddenLabel
                                                        id="filled-hidden-label-small"
                                                        defaultValue={props.car.model}
                                                        variant="filled"
                                                        size="small"
                                                        onChange={(e)=>{
                                                            setCurrentCar({
                                                                ...currentCar,
                                                                model: e.target.value
                                                            })
                                                        }}
                                                        /></LeftText>
                                </Grid>
                                <Grid item xs={3.5} sx={{m: 1}} direction="column" alignItems="bottom" justifyContent="center" display="flex">
                                        <LeftText sx={{fontWeight: 'bold'}}>Details:</LeftText>
                                    <Grid container justifyContent="space-between">
                                        <LeftText >seats:</LeftText>
                                        <RightText ><TextField
                                                        hiddenLabel
                                                        id="filled-hidden-label-small"
                                                        defaultValue={props.car.seats}
                                                        variant="filled"
                                                        size="small"
                                                        onChange={(e)=>{
                                                            setCurrentCar({
                                                                ...currentCar,
                                                                seats: Number(e.target.value)
                                                            })
                                                        }}
                                                        /></RightText>
                                    </Grid>
                                    <Grid container justifyContent="space-between">
                                        <LeftText >doors:</LeftText>
                                        <RightText ><TextField
                                                        hiddenLabel
                                                        id="filled-hidden-label-small"
                                                        defaultValue={props.car.doors}
                                                        variant="filled"
                                                        size="small"
                                                        onChange={(e)=>{
                                                            setCurrentCar({
                                                                ...currentCar,
                                                                doors: Number(e.target.value)
                                                            })
                                                        }}
                                                        /></RightText>
                                    </Grid>
                                    <Grid container justifyContent="space-between">
                                        <LeftText >mileage:</LeftText>
                                        <RightText ><TextField
                                                        hiddenLabel
                                                        id="filled-hidden-label-small"
                                                        defaultValue={props.car.mileage}
                                                        variant="filled"
                                                        size="small"
                                                        onChange={(e)=>{
                                                            setCurrentCar({
                                                                ...currentCar,
                                                                mileage: Number(e.target.value)
                                                            })
                                                        }}
                                                        /></RightText>
                                    </Grid>
                                    <Grid container justifyContent="space-between">
                                        <LeftText >fuel:</LeftText>
                                        <RightText ><TextField
                                                        hiddenLabel
                                                        id="filled-hidden-label-small"
                                                        defaultValue={props.car.fuelType}
                                                        variant="filled"
                                                        size="small"
                                                        onChange={(e)=>{
                                                            setCurrentCar({
                                                                ...currentCar,
                                                                fuelType: e.target.value
                                                            })
                                                        }}
                                                        /></RightText>
                                    </Grid>
                                    <Grid container justifyContent="space-between">
                                        <LeftText >VIN:</LeftText>
                                        <RightText ><TextField
                                                        hiddenLabel
                                                        id="filled-hidden-label-small"
                                                        defaultValue={props.car.vin}
                                                        variant="filled"
                                                        size="small"
                                                        onChange={(e)=>{
                                                            setCurrentCar({
                                                                ...currentCar,
                                                                vin: Number(e.target.value)
                                                            })
                                                        }}
                                                        /></RightText>
                                    </Grid>
                                    <Grid container justifyContent="space-between">
                                        <LeftText >year:</LeftText>
                                        <RightText ><TextField
                                                        hiddenLabel
                                                        id="filled-hidden-label-small"
                                                        defaultValue={props.car.year}
                                                        variant="filled"
                                                        size="small"
                                                        onChange={(e)=>{
                                                            setCurrentCar({
                                                                ...currentCar,
                                                                year: Number(e.target.value)
                                                            })
                                                        }}
                                                        /></RightText>
                                    </Grid>
                                    <Grid container justifyContent="space-between">
                                        <LeftText >body type:</LeftText>
                                        <RightText ><TextField
                                                        hiddenLabel
                                                        id="filled-hidden-label-small"
                                                        defaultValue={props.car.bodyType}
                                                        variant="filled"
                                                        size="small"
                                                        onChange={(e)=>{
                                                            setCurrentCar({
                                                                ...currentCar,
                                                                bodyType: e.target.value
                                                            })
                                                        }}
                                                        /></RightText>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3} sx={{m: 1, borderLeft: 1, paddingLeft: 1}} direction="column" alignItems="bottom" justifyContent="center" display="flex">
                                         <LeftText sx={{fontWeight: 'bold'}}>Location:</LeftText>
                                    <Grid container justifyContent="space-between">
                                        <LeftText >city:</LeftText>
                                        <RightText ><TextField
                                                        hiddenLabel
                                                        id="filled-hidden-label-small"
                                                        defaultValue={props.car.city}
                                                        variant="filled"
                                                        size="small"
                                                        onChange={(e)=>{
                                                            setCurrentCar({
                                                                ...currentCar,
                                                                city: e.target.value
                                                            })
                                                        }}
                                                        /></RightText>
                                    </Grid>
                                        <LeftText sx={{fontWeight: 'bold'}}>Price per day</LeftText>
                                        <Grid container justifyContent="space-between">
                                        <LeftText>in $:</LeftText>
                                        <RightText ><TextField
                                                        hiddenLabel
                                                        id="filled-hidden-label-small"
                                                        defaultValue={props.car.pricePerDay}
                                                        variant="filled"
                                                        size="small"
                                                        onChange={(e)=>{
                                                            setCurrentCar({
                                                                ...currentCar,
                                                                pricePerDay: Number(e.target.value)
                                                            })
                                                        }}
                                                        /></RightText>
                                    </Grid>
                                    
                                </Grid>
                                <Grid item xs={1} sx={{m: 1}} direction="column" alignItems="bottom" justifyContent="center" display="flex">
                                    <Button
                                        style={{marginBottom: "5px"}}
                                        color="inherit"
                                        disabled={false}
                                        size="small"
                                        variant="outlined"
                                        onClick={saveHandle}
                                        >
                                        save
                                    </Button>
                                    <Button
                                        color="inherit"
                                        disabled={false}
                                        size="small"
                                        variant="outlined"
                                        onClick={cancelHandle}
                                        >
                                        cancel
                                    </Button>
                                </Grid>
                        </Grid>
                   
                </Card>
            </Box> 
            :
            <Box sx={{ m: 1 }}>
                <Card>
                        <Grid container spacing={0} display="flex">
                            {/*Render the InnerGrid as a child item */}
                                <Grid item xs={3.5} sx={{m: 1}} direction="column" alignItems="bottom" justifyContent="center" display="flex">
                                    <CardMedia component="img"
                                                //image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2018-rolls-royce-phantom-1536152159.png?crop=1.00xw:1.00xh;0,0&resize=980:*"
                                                alt="Car photo"
                                                width="40px"
                                                ></CardMedia>
                                    <LeftText variant='h4' sx={{fontWeight: 'bold'}}>{props.car.brand}</LeftText>
                                    <LeftText variant='h5'>{props.car.model}</LeftText>
                                </Grid>
                                <Grid item xs={3.5} sx={{m: 1}} direction="column" alignItems="bottom" justifyContent="center" display="flex">
                                        <LeftText sx={{fontWeight: 'bold'}}>Details:</LeftText>
                                    <Grid container justifyContent="space-between">
                                        <LeftText >seats:</LeftText>
                                        <RightText >{String(props.car.seats)}</RightText>
                                    </Grid>
                                    <Grid container justifyContent="space-between">
                                        <LeftText >doors:</LeftText>
                                        <RightText >{String(props.car.doors)}</RightText>
                                    </Grid>
                                    <Grid container justifyContent="space-between">
                                        <LeftText >mileage:</LeftText>
                                        <RightText >{String(props.car.mileage)}</RightText>
                                    </Grid>
                                    <Grid container justifyContent="space-between">
                                        <LeftText >fuel:</LeftText>
                                        <RightText >{props.car.fuelType}</RightText>
                                    </Grid>
                                    <Grid container justifyContent="space-between">
                                        <LeftText >VIN:</LeftText>
                                        <RightText >{String(props.car.vin)}</RightText>
                                    </Grid>
                                    <Grid container justifyContent="space-between">
                                        <LeftText >year:</LeftText>
                                        <RightText >{String(props.car.year)}</RightText>
                                    </Grid>
                                    <Grid container justifyContent="space-between">
                                        <LeftText >body type:</LeftText>
                                        <RightText >{String(props.car.bodyType)}</RightText>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3} sx={{m: 1, borderLeft: 1, paddingLeft: 1}} direction="column" alignItems="bottom" justifyContent="center" display="flex">
                                         <LeftText sx={{fontWeight: 'bold'}}>Location:</LeftText>
                                    <Grid container justifyContent="space-between">
                                        <LeftText >city:</LeftText>
                                        <RightText >{props.car.city}</RightText>
                                    </Grid>
                                        <LeftText sx={{fontWeight: 'bold'}}>Price per day:</LeftText>
                                    <Grid container justifyContent="space-between">
                                        <LeftText>in $:</LeftText>
                                        <RightText >{String(props.car.pricePerDay)}</RightText>
                                    </Grid>
                                   
                                </Grid>
                                <Grid item xs={1} sx={{m: 1}} direction="column" alignItems="bottom" justifyContent="center" display="flex">
                                    <Button
                                        style={{marginBottom: "5px"}}
                                        color="inherit"
                                        disabled={false}
                                        size="small"
                                        variant="outlined"
                                        onClick={editHandle}
                                        >
                                        edit
                                    </Button>
                                    <Button
                                        color="inherit"
                                        disabled={false}
                                        size="small"
                                        variant="outlined"
                                        onClick={deleteHandle}
                                        >
                                        delete
                                    </Button>
                                </Grid>
                        </Grid>
                   
                </Card>
            </Box> }
        </Loader>
    );
}



export default CarItem;