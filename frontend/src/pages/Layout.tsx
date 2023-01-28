import { AppBar, Button,  Divider,  Drawer, IconButton,  List,  ListItem,  ListItemButton,  ListItemIcon,  ListItemText,  Menu, MenuItem, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import Cars from './Cars';
import Bookings from './Bookings';
import { styled, useTheme } from '@mui/material/styles';
import { Link } from "react-router-dom";
import React from "react";

function Layout() {
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
        <Toolbar />
        <Divider />
        <List>
            <ListItem component={Link} to={`/Cars`}  disablePadding>
              <ListItemButton>
                
                <ListItemText>Cars</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem component={Link} to={`/Bookings`}  disablePadding>
              <ListItemButton>
                
                <ListItemText>Bookings</ListItemText>
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
      </Drawer>
  );
}

export default Layout;