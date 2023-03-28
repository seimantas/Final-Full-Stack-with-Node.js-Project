import { FC, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { ItHavePremissionContext } from "../ItHavePremissinContext/ItHavePremissionContext";

export const Header: FC = () => {
  const { isLogdin, setIsLogdin } = useContext(ItHavePremissionContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setOpen(open);
  };

  const toLogout = () => {
    localStorage.removeItem("token");
    setIsLogdin(false);
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{backgroundColor: "#000000"}}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Event Manager
          </Typography>
        </Box>
        {isLogdin ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button component={Link} to="/events" color="inherit">
                Events
              </Button>
              <Button component={Link} to="/users-list" color="inherit">
                Users
              </Button>
              <Button onClick={toLogout} color="inherit">
                Log out
              </Button>
            </Box>
          </>
        ) : (
          <Typography variant="body1" sx={{ mr: 2, display: {xs: 'none', sm: 'block'} }}>
            You are not logged in
          </Typography>
        )}
        <Drawer
          anchor='left'
          open={open}
          onClose={toggleDrawer(false)}
        >
          <List sx={{width: 250}}>
            {isLogdin ? (
              <>
                <ListItem button component={Link} to="/events" onClick={toggleDrawer(false)}>
                  <ListItemText primary="Events" />
                </ListItem>
                <Divider />
                <ListItem button component={Link} to="/users-list" onClick={toggleDrawer(false)}>
                  <ListItemText primary="Users" />
                </ListItem>
                <Divider />
                <ListItem button onClick={toLogout}>
                  <ListItemText primary="Log out" />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem sx={{display: {xs: 'none', sm: 'block'}}}>
                  <ListItemText primary="You are not logged in" />
                </ListItem>
              </>
            )}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};


