import React, { useState } from "react";
import { Car } from "../model/Car";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { Box, Card, Grid, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface AddCarFormProps {
  saveCar: (car: Car) => void;
}

const AddCarForm: React.FC<AddCarFormProps> = (props: AddCarFormProps) => {
  let car_: Car = {
    id: "",
    brand: "",
    model: "",
    doors: -1,
    seats: -1,
    year: -1,
    fuelType: "",
    pricePerDay: -1,
    vin: -1,
    mileage: -1,
    city: "",
    bodyType: "",
  };

  const [addedCar, setAddedCar] = useState(car_);

  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (
      isStringValid(addedCar.brand) &&
      isBodyTypeValid(addedCar.bodyType) &&
      isStringValid(addedCar.city) &&
      isNumberValid(addedCar.doors) &&
      isStringValid(addedCar.fuelType) &&
      isStringValid(addedCar.model) &&
      isNumberValid(addedCar.mileage) &&
      isNumberValid(addedCar.vin) &&
      isYearValid(addedCar.year) &&
      isNumberValid(addedCar.seats) &&
      isNumberValid(addedCar.pricePerDay)
    ) {
      //add car
      props.saveCar(addedCar);

      setOpen(false);
    }
  };
  const isStringValid = (str: String) => str.length > 1;
  const isNumberValid = (num: Number) => num > 0;
  const isYearValid = (num: Number) => num > 1900 && num < 2023;
  const isBodyTypeValid = (str: String) => str.includes("cabriolet" || "coupé" || "hatchback" || "limousine" ||  "minivan" || "pickup" || "sedan" || "roadster")
  return (
    <Dialog open={open}>
      <Grid container>
        <Grid item xs={4}>
          <Box sx={{ m: 1 }}>
            <Card
              style={{
                height: "20vh",
                margin: "auto",
                flexDirection: "column",
              }}
            >
              IMAGE UPLOADss
            </Card>
          </Box>
          <Box sx={{ m: 1 }}>
            <Card>
              <TextField
                onChange={(e) => {
                  setAddedCar({
                    ...addedCar,
                    brand: e.target.value,
                  });
                  console.log(addedCar);
                }}
                id="car-brand"
                label="car brand"
                variant="filled"
                required
                error={!isStringValid(addedCar.brand)}
              />
            </Card>
          </Box>
          <Box sx={{ m: 1 }}>
            <Card>
              <TextField
                onChange={(e) => {
                  setAddedCar({
                    ...addedCar,
                    model: e.target.value,
                  });
                }}
                id="car-model"
                label="car model"
                variant="filled"
                required
                error={!isStringValid(addedCar.model)}
              />
            </Card>
          </Box>
          <Box sx={{ m: 1 }}>
            <Card>
              <TextField
                onChange={(e) => {
                  setAddedCar({
                    ...addedCar,
                    bodyType: e.target.value,
                  });
                }}
                id="car-body"
                label="body type"
                variant="filled"
                required
                error={!isBodyTypeValid(addedCar.bodyType)}
              />
            </Card>
          </Box>
        </Grid>

        <Grid item xs={4}>
          <Box
            sx={{ m: 1 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Typography variant="h5" align="center" sx={{ fontWeight: "bold" }}>
              car info
            </Typography>
          </Box>
          <Box sx={{ m: 1 }}>
            <Card>
              <TextField
                onChange={(e) => {
                  setAddedCar({
                    ...addedCar,
                    seats: Number(e.target.value),
                  });
                }}
                id="car-seats"
                label="no. seats"
                variant="filled"
                required
                error={!isNumberValid(addedCar.seats)}
              />
            </Card>
          </Box>
          <Box sx={{ m: 1 }}>
            <Card>
              <TextField
                onChange={(e) => {
                  setAddedCar({
                    ...addedCar,
                    doors: Number(e.target.value),
                  });
                }}
                id="car-doors"
                label="no. doors"
                variant="filled"
                required
                error={!isNumberValid(addedCar.doors)}
              />
            </Card>
          </Box>
          <Box sx={{ m: 1 }}>
            <Card>
              <TextField
                onChange={(e) => {
                  setAddedCar({
                    ...addedCar,
                    year: Number(e.target.value),
                  });
                }}
                id="car-year"
                label="year"
                variant="filled"
                required
                error={!isYearValid(addedCar.year)}
              />
            </Card>
          </Box>
          <Box sx={{ m: 1 }}>
            <Card>
              <TextField
                onChange={(e) => {
                  setAddedCar({
                    ...addedCar,
                    vin: Number(e.target.value),
                  });
                }}
                id="car-vin"
                label="vin"
                variant="filled"
                required
                error={!isNumberValid(addedCar.vin)}
              />
            </Card>
          </Box>
          <Box sx={{ m: 1 }}>
            <Card>
              <TextField
                onChange={(e) => {
                  setAddedCar({
                    ...addedCar,
                    mileage: Number(e.target.value),
                  });
                }}
                id="car-mileage"
                label="mileage (miles)"
                variant="filled"
                required
                error={!isNumberValid(addedCar.mileage)}
              />
            </Card>
          </Box>
          <Box sx={{ m: 1 }}>
            <Card>
              <TextField
                onChange={(e) => {
                  setAddedCar({
                    ...addedCar,
                    fuelType: e.target.value,
                  });
                }}
                id="car-fuel"
                label="fuel type"
                variant="filled"
                required
                error={!isStringValid(addedCar.fuelType)}
              />
            </Card>
          </Box>
        </Grid>

        <Grid item xs={4}>
          <Box sx={{ m: 1 }} style={{ justifyContent: "center" }}>
            <Typography variant="h5" align="center" sx={{ fontWeight: "bold" }}>
              pick-up
            </Typography>
            <Typography variant="h5" align="center" sx={{ fontWeight: "bold" }}>
              location
            </Typography>
          </Box>
          <Box sx={{ m: 1 }}>
            <Card>
              <TextField
                onChange={(e) => {
                  setAddedCar({
                    ...addedCar,
                    city: e.target.value,
                  });
                }}
                id="car-city"
                label="city"
                variant="filled"
                required
                error={!isStringValid(addedCar.city)}
              />
            </Card>
          </Box>
          <Box sx={{ m: 1 }} style={{ justifyContent: "center" }}>
            <Typography variant="h5" align="center" sx={{ fontWeight: "bold" }}>
              price per day
            </Typography>
            <Card>
              <TextField
                onChange={(e) => {
                  setAddedCar({
                    ...addedCar,
                    pricePerDay: Number(e.target.value),
                  });
                }}
                id="car-price"
                label="price per day"
                variant="filled"
                required
                error={!isNumberValid(addedCar.pricePerDay)}
              />
            </Card>
          </Box>
        </Grid>
      </Grid>
      <Button
        onClick={handleSubmit}
        color="inherit"
        disabled={false}
        size="small"
        variant="outlined"
        style={{
          position: "absolute",
          bottom: "1.5%",
          right: "1.5%",
        }}
      >
        submit
      </Button>
      <IconButton
        aria-label="delete"
        onClick={handleClose}
        size="medium"
        style={{
          position: "absolute",
          top: "1.5%",
          right: "1.5%",
        }}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
    </Dialog>
  );
};

export default AddCarForm;
