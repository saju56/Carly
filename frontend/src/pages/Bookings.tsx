import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import "./Cars.css";
import {
  autocompleteClasses,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Loader from "../utils/Loader";
import BookingItem from "../components/BookingItem";
import { Car } from "../model/Car";
import AddIcon from "@mui/icons-material/Add";
import { Booking } from "../model/Booking";
import { Context } from "../App";
/* READ DATA FOR TESTING ONLY  */
import { maxHeaderSize } from "http";
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

function Bookings() {
  const [sort, setSort] = React.useState("");
  const handleSortChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };
  const { token, setToken } = useContext(Context);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const getBookings = async () => {
    await fetch(`${properties.url}/logic/api/bookings`, {
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
      .then((bookings) => {
        setBookings(bookings);
        console.log("Success fetching bookings.");
      })
      .catch((e) => {
        console.log("Error when trying to fetch bookings: " + e);
      });
  };

  useEffect(() => {
    getBookings();
  }, []);
  
const updateList = () => {
    getBookings();
}



  return (
    // Top bar
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
              current
            </Typography>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              color="black"
            >
              bookings
            </Typography>
          </div>

          <Grid container justifyContent="flex-end">
            {/* Search functionality */}
            <Grid item direction="column" alignItems="center">
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

      {/* List of bookings */}
      <Grid sx={{ overflowY: "scroll", maxHeight: "81vh" }}>
        <Loader loading={loading}>
          {bookings.map((booking) => (
            <BookingItem booking={booking} updateList={updateList} />
          ))}
        </Loader>
      </Grid>
    </Box>
  );
}

export default Bookings;
