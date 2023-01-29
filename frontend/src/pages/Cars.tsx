import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import "./Cars.css";
import {
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Loader from "../utils/Loader";
import CarItem from "../components/CarItem";
import { Car } from "../model/Car";
import AddIcon from "@mui/icons-material/Add";

/* READ DATA FOR TESTING ONLY  */
import { maxHeaderSize } from "http";
import AddCarForm from "../components/AddCarForm";
import AddCarFormContainer from "../components/AddCarFormContainer";
import { render } from "@testing-library/react";
import { Context } from "../App";
import { properties } from "../resources/properties";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

async function request<TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> {
  return await fetch(url, config)
    .then((response) => response.json())
    .then((data) => data as TResponse);
}

function Cars() {
  let navigate = useNavigate();
  const { token, setToken } = useContext(Context);

  const [sort, setSort] = React.useState("");

  const handleSortChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  const getCars = async () => {
    await fetch(`${properties.url}/logic/api/cars`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        else {
          throw new Error("ERROR " + response.status);
        }
      })
      .then((cars) => {
        setCars(cars);

        console.log("Success fetching cars.");
      })
      .catch((e) => {
        console.log("Error when trying to fetch cars: " + e);
      });
  };

  useEffect(() => {
    getCars();
  }, []);

  const updateList = () => {
    getCars();
  };
  const addClick = () => {
    render(<AddCarFormContainer updateList={updateList} />);
  };

  const handleClose = () => {
    //setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ height: "9vh" }}>
        <Toolbar style={{ backgroundColor: "#DADEEA" }}>
          <div className="CarsHeading">
            <Typography
              variant="h5"
              style={{ marginTop: "5px", marginBottom: "-10px" }}
              sx={{
                flexGrow: 1,
                fontWeight: "bold",
                display: { xs: "none", sm: "block" },
              }}
              color="black"
            >
              available
            </Typography>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              color="black"
            >
              cars
            </Typography>
          </div>

          <Grid container justifyContent="flex-end">
            {/* sort by functionality  */}
            <Grid item direction="column" alignItems="center">
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">sort by</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={sort}
                  label="sort by"
                  onChange={handleSortChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"brand"}>brand</MenuItem>
                  <MenuItem value={"mileage"}>mileage</MenuItem>
                  <MenuItem value={"price"}>price per day</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Search functionality */}
            <Grid
              item
              direction="column"
              alignItems="center"
              justifyContent="center"
              display="flex"
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon style={{ color: "black" }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {/* List of cars */}
      <Grid sx={{ overflowY: "scroll", maxHeight: "81vh" }}>
        <Loader loading={loading}>
          {cars.map((car) => (
            <CarItem car={car} updateList={updateList} />
          ))}
        </Loader>
      </Grid>

      {/* Floating add button */}
      <Fab
        onClick={addClick}
        variant="extended"
        size="medium"
        color="inherit"
        aria-label="add"
        style={{
          position: "absolute",
          bottom: "1.5%",
          right: "1.5%",
          color: "black",
        }}
      >
        <AddIcon sx={{ mr: 1 }} style={{ color: "black" }} />
        add
      </Fab>
    </Box>
  );
}

export default Cars;
