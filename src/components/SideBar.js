import React from 'react'
import {

    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Box,
  } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SettingsIcon from "@mui/icons-material/Settings";
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import LoyaltyIcon from '@mui/icons-material/Loyalty';
function SideBar() {
    const location = useLocation();
  return (
    <Box position="fixed" sx={{ width: 300,height: '100vh', display: 'flex', flexDirection: 'column',zIndex: 1300, }}>
    <Box sx={{ flex: 1, backgroundColor: '#fff',margin:2,borderRadius:7 }}>
     
      <Typography variant="h6" style={{ textAlign:'center',paddingTop:20,paddingBottom:20 }}>
               ERP Dashboard
             </Typography>
             {/* <Toolbar /> */}
       <List sx={{ padding: 0.5 }}>
         {[
           { text: "Dashboard", icon: <DashboardIcon />, link: "/" },
           { text: "Invoices", icon: <PeopleIcon />, link: "/invoices" },
           { text: "Proforma Invoices", icon: <AttachMoneyIcon />, link: "/proformainvoices" },
           { text: "Sales", icon: <LoyaltyIcon />, link: "/sales" },
           { text: "Settings", icon: <SettingsIcon />, link: "/settings" },
         ].map((item, index) => (
           <ListItem
             button
             key={index}
             component={Link}
             to={item.link}
             sx={{
               borderRadius: 15,
               marginBottom: 0.5,
               backgroundColor: location.pathname === item.link ? '#ebedfc' : 'transparent', // Active tab background color
               '&:hover': {
                 backgroundColor: location.pathname === item.link ? '#bdbdbd' : '#ebedfc', // Hover effect for active tab
               },
             }}
           >
             <ListItemIcon>{item.icon}</ListItemIcon>
             <ListItemText primary={item.text} sx={{ color: '#666' }} />
           </ListItem>
         ))}
       </List>
      </Box>
      </Box>
  )
}

export default SideBar