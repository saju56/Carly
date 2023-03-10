import { Button,  Divider,  Drawer,  List,  ListItem,  ListItemButton, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Context } from "../App";

function Layout() {
  const {token, setToken} = useContext(Context);
  
  return (
  <Drawer
        sx={{
          width: '150px',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: '150px',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar style={{display:"flex", justifyContent:"center"}}>
          <Typography variant="h5" align="center" fontSize="30px">
             c  a  r  l  y
          </Typography>
        </Toolbar>
        <Divider/>
        {token==='' ? <List/> :
        <List>
            <ListItem component={Link} to={`/Cars`}  disablePadding> 
              <ListItemButton>
                <Button
                    size="large"
                    style={{color: 'black'}}
                    variant="text" startIcon={<DirectionsCarIcon style={{color: 'black'}}/>}>
                     cars 
                 </Button>
              </ListItemButton>
            </ListItem>
            <ListItem component={Link} to={`/Bookings`}  disablePadding>
              <ListItemButton>
                <Button
                  style={{color: 'black'}}
                  size="large"
                  variant="text" startIcon={<CalendarMonthIcon style={{color: 'black'}}/>}>
                   bookings
                </Button>
              </ListItemButton>
            </ListItem>
        </List>
        }
      </Drawer>
  );
}

export default Layout;