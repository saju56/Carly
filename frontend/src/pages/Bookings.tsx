import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import './Cars.css';
import { autocompleteClasses, Fab, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Loader from "../utils/Loader";
import BookingItem from '../components/BookingItem';
import {Car} from "../model/Car";
import AddIcon from '@mui/icons-material/Add';
import { Booking } from '../model/Booking';

 /* READ DATA FOR TESTING ONLY  */
 import bookings_ from './data2.json';
import { maxHeaderSize } from 'http';
import { getBookings } from '../logic/api';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


function Bookings () {
  let navigate = useNavigate();

  const [sort, setSort] = React.useState('');
  const handleSortChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  const [bookings, setBookings] = useState(bookings_);
  //const [loading, setLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  /*
  useEffect(()=> {
    getBookings()
        .then(bookings => setBookings(bookings))
        .catch(e => console.error(JSON.stringify(e)))
        .finally(()=>setLoading(false))
  },[])

const updateList = () => {
    getBookings()
        .then(bookings => setBookings(bookings))
        .catch(e => console.error(JSON.stringify(e)))
        .finally(()=>setLoading(false))
}
*/
  useEffect(()=> {
  },[])

  const updateList = () => {
      
  }
 

    return (
      // Top bar 
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{height: "9vh"}}>
        <Toolbar style={{backgroundColor: '#DADEEA'}}>
          <div className="CarsHeading">
          <Typography variant="h5" style={{marginTop: '5px', marginBottom: '-10px'}} sx={{ flexGrow: 1, fontWeight: 'bold', display: { xs: 'none', sm: 'block' } }} color="black">
            current
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} color='black'>
            bookings
          </Typography>
          </div>

        <Grid container justifyContent="flex-end">

           {/* Search functionality */}
           <Grid item direction="column" alignItems="center">
          <Search>
            <SearchIconWrapper>
              <SearchIcon style={{color: 'black'}}/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          </Grid>
        </Grid>
          

        </Toolbar>
      </AppBar>
      
      {/* List of bookings */}
      <Grid  sx={{ overflowY: "scroll", maxHeight: "81vh" }}>
      <Loader loading={loading}>
             {bookings.map(booking => <BookingItem booking={booking} updateList={updateList} />)}
      </Loader>
      </Grid>

    
      
    </Box>


    );
  };
  
  export default Bookings;