import React, {useState} from 'react';
import {Car} from "../model/Car";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Card, Grid, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface AddCarFormProps {
    saveCar: (car: Car) => void;
    hideForm: () => void;
}

const AddCarForm: React.FC<AddCarFormProps> = (props: AddCarFormProps) => {
   
    const [addedCar, setAddedCar] = useState('');

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };

    const handleSave = () => {
        //props.saveCar(addedCar);
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <Grid container>
                <Grid item xs={4}>
                    <Box sx={{ m: 1 }} >
                        <Card style={{height: "20vh", margin: 'auto', flexDirection: 'column' }}>
                        IMAGE UPLOADss
                        </Card>
                    </Box>
                    <Box sx={{ m: 1}}>
                        <Card>
                            <TextField id="car-brand" label="car brand" variant="filled"/>
                        </Card>
                    </Box>
                    <Box sx={{ m: 1 }}>
                        <Card>
                            <TextField id="car-model" label="car model" variant="filled"/>
                        </Card>
                    </Box>
                </Grid>

                <Grid item xs={4}>
                    <Box sx={{ m: 1 }} style={{display:"flex", justifyContent:"center"}}>
                        <Typography variant="h5" align="center" sx={{fontWeight: 'bold'}}>car info</Typography>
                    </Box>
                    <Box sx={{ m: 1 }}>
                        <Card>
                            <TextField id="car-seats" label="no. seats" variant="filled"/>
                        </Card>
                    </Box>
                    <Box sx={{ m: 1 }}>
                        <Card>
                            <TextField id="car-doors" label="no. doors" variant="filled"/>
                        </Card>
                    </Box>
                    <Box sx={{ m: 1 }}>
                        <Card>
                            <TextField id="car-year" label="year" variant="filled"/>
                        </Card>
                    </Box>
                    <Box sx={{ m: 1 }}>
                        <Card>
                            <TextField id="car-vin" label="vin" variant="filled"/>
                        </Card>
                    </Box>
                    <Box sx={{ m: 1 }}>
                        <Card>
                            <TextField id="car-mileage" label="mileage (miles)" variant="filled"/>
                        </Card>
                    </Box>
                    <Box sx={{ m: 1 }}>
                        <Card>
                            <TextField id="car-fuel" label="fuel type" variant="filled"/>
                        </Card>
                    </Box>
                    
                </Grid>

                <Grid item xs={4}>
                    <Box sx={{ m: 1 }} style={{justifyContent:"center"}}>
                        <Typography variant="h5" align="center" sx={{fontWeight: 'bold'}}>pick-up</Typography>
                        <Typography variant="h5" align="center" sx={{fontWeight: 'bold'}}>location</Typography>
                    </Box>
                    <Box sx={{ m: 1 }}>
                        <Card>
                            <TextField id="car-city" label="city" variant="filled"/>
                        </Card>
                    </Box>
                    <Box sx={{ m: 1 }}>
                        <Card>
                            <TextField id="car-street" label="street" variant="filled"/>
                        </Card>
                    </Box>
                    <Box sx={{ m: 1 }}>
                        <Card>
                            <TextField id="car-house" label="house no." variant="filled"/>
                        </Card>
                    </Box>
                </Grid>

            </Grid>
            <Button
                onClick={handleSave}
                color="inherit"
                disabled={false}
                size="small"
                variant="outlined"
                style={{
                position: "absolute",
                 bottom: '1.5%',
                 right: '1.5%'}}>
                    submit
            </Button>
            <IconButton aria-label="delete" 
                onClick={handleClose}
                size="medium" style={{
                position: "absolute",
                top: '1.5%',
                right: '1.5%'}}
                >
                <CloseIcon fontSize="inherit" />
            </IconButton>
      </Dialog>
    )
}

export default AddCarForm;
