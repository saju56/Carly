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
import { autocompleteClasses, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Loader from "../utils/Loader";
import CarItem from '../components/CarItem';
import {Car} from "../model/Car";

 /* READ DATA FOR TESTING ONLY  */
 import cars_ from './data.json';
import { maxHeaderSize } from 'http';

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
  color: 'inherit',
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


function Cars () {
  let navigate = useNavigate();

  const [sort, setSort] = React.useState('');
  const handleSortChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  const [cars, setCars] = useState(cars_);
  //const [loading, setLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  


  useEffect(()=> {
  },[])

  const updateList = () => {
      
  }
 

    return (
      // Top bar 
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{height: "9vh"}}>
        <Toolbar>
          <div className="CarsHeading">
          <Typography variant="h5" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            available
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            cars
          </Typography>
          </div>

        <Grid container justifyContent="flex-end">
          {/* sort by functionality */}
          <Grid item direction="column"
      alignItems="center" >
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
                  <MenuItem value={'brand'}>brand</MenuItem>
                  <MenuItem value={'mileage'}>mileage</MenuItem>
                  <MenuItem value={'price'}>price per day</MenuItem>
              </Select>
          </FormControl>
          </Grid>

           {/* Search functionality */}
           <Grid item direction="column"
      alignItems="center">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
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

      {/* List of cars */}
      <Grid  sx={{ overflowY: "scroll", maxHeight: "81vh" }}>
      <Loader loading={loading}>
             {cars.map(car => <CarItem car={car} updateList={updateList} />)}
      </Loader>
      </Grid>


    </Box>


    );
  };
  
  export default Cars;