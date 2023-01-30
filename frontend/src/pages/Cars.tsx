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
  Checkbox,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Loader from "../utils/Loader";
import CarItem from "../components/CarItem";
import { Car } from "../model/Car";
import AddIcon from "@mui/icons-material/Add";
import AddCarFormContainer from "../components/AddCarFormContainer";
import { Context } from "../App";
import { properties } from "../resources/properties";
import {render} from "react-dom";
import {createRoot, hydrateRoot} from "react-dom/client";
const ITEMS_ON_PAGE = 3;

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function Cars() {
  let navigate = useNavigate();
  const { token, setToken } = useContext(Context);

  const [sort, setSort] = React.useState("brand");
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = useState('');

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [pagesCounter, setPagesCounter] = useState(0);
  const [page, setPage] = useState(1);
   // tutaj są kryteria filtrowania

   


  const getCars = async () => {
    await fetch(`${properties.url}/logic/api/cars`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        else {
          throw new Error("ERROR " + response.status);
        }
      })
      .then((cars) => {
        setPagesCounter(Math.ceil(cars.length/ITEMS_ON_PAGE));
        console.log("Success fetching cars.");
      })
      .catch((e) => {
        console.log("Error when trying to fetch cars: " + e);
      });
  };

  // const sortCars = async () => {
  //   await fetch(`${properties.url}/logic/api/offers?dateFrom=0&dateTo=0&sortBy=${sort}&page=0&itemsOnPage=4&25`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((response) => {
  //       if (response.ok) return response.json();
  //       else {
  //         throw new Error("ERROR " + response.status);
  //       }
  //     })
  //     .then((cars) => {
  //       setCars(cars);

  //       console.log("Success fetching cars.");
  //     })
  //     .catch((e) => {
  //       console.log("Error when trying to fetch cars: " + e);
  //     });
  // };

  const searchCars = async () => {
    await fetch(
      `${properties.url}/logic/api/offers?dateFrom=0&dateTo=0&sortBy=${sort}&page=${page-1}&itemsOnPage=${ITEMS_ON_PAGE}&model=${search}%&bodyType=${filter}%25`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) return response.json();
        else {
          throw new Error("ERROR " + response.status);
        }
      })
      .then((cars) => {
        setCars(cars);
        console.log(token);
        console.log("Success fetching cars.");
      })
      .catch((e) => {
        console.log(token);
        console.log("Error when trying to fetch cars: " + e);
      });
  };


  
  useEffect(() => {
    if (pagesCounter === 0) {
      console.log('GETCARS------------------------------------------------------------------');
      getCars();
    } else {
      searchCars();
    }
  }, [search, sort, filter, page, pagesCounter]);

  const updateList = () => {
    searchCars();
  };
  const addClick = () => {
    const root = hydrateRoot(document.getElementById('root')!, <AddCarFormContainer updateList={updateList} token={token}/>)
    //cr.render(<AddCarFormContainer updateList={updateList} token={token}/>);
  };

  

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ height: "9vh" }} style={{ backgroundColor: "#DADEEA" }}>
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
            {/* filter by functionality */}
            <Grid item direction="column" alignItems="center">
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">body type</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={filter}
                  label="body type"
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"cabriolet"}>cabriolet</MenuItem>
                  <MenuItem value={"coupé"}>coupé</MenuItem>
                  <MenuItem value={"hatchback"}>hatchback</MenuItem>
                  <MenuItem value={"limousine"}>limousine</MenuItem>
                  <MenuItem value={"minivan"}>minivan</MenuItem>
                  <MenuItem value={"pickup"}>pickup</MenuItem>
                  <MenuItem value={"sedan"}>sedan</MenuItem>
                  <MenuItem value={"roadster"}>roadster</MenuItem>
                </Select>
              </FormControl>
            </Grid>
   

            {/* sort by functionality  */}
            <Grid item direction="column" alignItems="center">
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">sort by</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={sort}
                  label="sort by"
                  onChange={(e) => setSort(e.target.value)}
                >
                  <MenuItem value={"brand"}>brand</MenuItem>
                  <MenuItem value={"mileage"}>mileage</MenuItem>
                  <MenuItem value={"pricePerDay"}>price/day</MenuItem>
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
                  placeholder="Search by model…"
                  inputProps={{ "aria-label": "search" }}
                  onChange={(e) => setSearch(e.target.value)}
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
      <Fab id="addButton"
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

      <Pagination count={pagesCounter} defaultPage={1} page={page} onChange={handlePageChange} siblingCount={0}
        style={{
          position: "fixed",
          bottom: "1.5%",
          color: "black",
      }}/>
    </Box>
  );
}

export default Cars;
