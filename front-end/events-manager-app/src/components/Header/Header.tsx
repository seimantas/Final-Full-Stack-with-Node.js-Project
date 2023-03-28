import { FC, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { ItHavePremissionContext } from "../ItHavePremissinContext/ItHavePremissionContext";

export const Header: FC = () => {
  const { isLogdin, setIsLogdin } = useContext(ItHavePremissionContext);
  const navigate = useNavigate();

  const toLogout = () => {
    localStorage.removeItem("token");
    setIsLogdin(false);
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Event Manager
        </Typography>
        {isLogdin ? (
          <>
            <Button component={Link} to="/events" color="inherit">
              Events
            </Button>
            <Button component={Link} to="/users-list" color="inherit">
              Users
            </Button>
            <Button onClick={toLogout} color="inherit">
              Log out
            </Button>
          </>
        ) : (
          <Typography variant="body1" sx={{ mr: 2 }}>
            You are not logged in
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};