import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Avatar,
  Menu,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };
const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      style={{
        background: "#5e72e4",
        color: "#000",
        width: "100%",
        height: "30vh",
      }}
    >
      {/* <Toolbar
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
       

        <IconButton color="inherit" onClick={handleMenuOpen}>
          <Avatar alt="Profile Picture" src="/path/to/profile.jpg" />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar> */}
    </AppBar>
  );
}
