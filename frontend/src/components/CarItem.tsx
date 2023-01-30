import React, {useContext, useEffect, useState} from 'react';
import {Car} from "../model/Car";
import Loader from "../utils/Loader";
import { Box, Button, Card, CardMedia, Grid, styled, TextField, Typography } from '@mui/material';
import { properties } from '../resources/properties';
import { Context } from '../App';
import AddCarFormContainer from "./AddCarFormContainer";
import AddCarImageFormContainer from "./AddCarImageFormContainer";
import {render} from "react-dom";
import {hydrateRoot} from "react-dom/client";



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
    const { token, setToken } = useContext(Context);
    const [carImage, setCarImage] = useState<string>();

    const theme = {
        spacing: 8,
      }
    
    const editHandle = () => {
        setEditing(true);
    }

    const cancelHandle = () => {
        setEditing(false);

    }
    useEffect(()=> {
        getCarImage(props.car.id);
    }, [])
    const getCarImage = async (carId: String) => {
        await fetch(`${properties.url}/logic/api/cars/${carId}/image`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            if (response.ok) return response.arrayBuffer()
            else throw new Error("ERROR " + response.status)
        }).then((data) => {

            var img = 'data:image/jpg;base64, '+_arrayBufferToBase64(data);
            if (img !== null) {
                setCarImage(img);
            }

            console.log("Success fetching car image.")
        }).catch((e) => {
            console.log("Error when trying to fetch car image: " + e)
        })
    }

    const addCarImage = () => {
        const root = hydrateRoot(document.getElementById('root')!,
            <AddCarImageFormContainer updateImage={() => getCarImage(props.car.id)} token={token} carId={props.car.id}/>)
    }

    const saveHandle = async(id: String, car: Car) => {
        await fetch(`${properties.url}/logic/api/cars/${id}`, {
            method: "PUT",
            headers: {
              'Authorization': `Bearer ${token}`,
              "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(car)
          })
            .then((response) => {
              if (response.ok) return response.json();
              else {
                throw new Error("ERROR " + response.status);
              }
            })
            .then(() => {
              console.log("Success editing car.");
            })
            .catch((e) => {
              console.log("Error when trying to edit car: " + e);
            })
            .finally(()=> {
                props.updateList();
              setEditing(false);
            });
    }

    
    const deleteHandle = async (id: String) => {
        setDeleting(true);
            await fetch(`${properties.url}/logic/api/cars/${id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
                //'Content-type': 'application/json; charset=UTF-8',
              },
            }).then((response) => {
              if (response.ok) return response.json()
              else throw new Error("ERROR " + response.status)
            }).then(() => {
              console.log("Success deleting car.")
            }).catch((e) => {
              console.log("Error when trying to deleting car: " + e)
              setDeleting(false);
            }).finally(()=>{
                setDeleting(false);
                props.updateList();
            })
    }
    function _arrayBufferToBase64( buffer ) {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }

    return (
        <Loader loading={deleting} label="Deleting">
            {editing ? 
            <Box sx={{ m: 1 }}>
                <Card>
                        <Grid container spacing={0} display='flex'>
                            {/*Render the InnerGrid as a child item */}
                                <Grid item xs={3.5} sx={{m: 1}} direction="column" alignItems="bottom" justifyContent="center" display="flex">
                                    <Card
                                        sx={{
                                            maxWidth: 280,
                                            margin: "0 auto",
                                        }}
                                    >
                                        <CardMedia component="img"
                                                   image={carImage}
                                                   alt="Car photo"
                                                   sx={{ objectFit: "contain" }}
                                        ></CardMedia>
                                    </Card>
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
                                        onClick={()=>saveHandle(props.car.id, currentCar)}
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
                                    <Card
                                        sx={{
                                            maxWidth: 280,
                                            margin: "0 auto",
                                        }}
                                    >
                                        <CardMedia component="img"
                                                    image={carImage}
                                                    alt="Car photo"
                                                    sx={{ objectFit: "contain" }}
                                        ></CardMedia>
                                    </Card>
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
                                        onClick={addCarImage}>
                                        add image
                                    </Button>

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
                                        onClick={()=>deleteHandle(props.car.id)}
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