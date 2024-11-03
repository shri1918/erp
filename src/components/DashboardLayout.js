import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Paper,
  Box,
  IconButton,
  useMediaQuery,
  MenuItem,
  Avatar, Menu
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SettingsIcon from "@mui/icons-material/Settings";
import { Routes, Route, Link } from "react-router-dom";
import InvoiceTable from "./InvoiceTable";
import InfoCard from "./InfoCard";
import { useTheme } from '@mui/material/styles';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import cardData from '../data/cardData';
import { invoiceData } from "../data/invoiceData";
import Invoices from "./Invoices";
import PerformaInvoice from "./ProformaInvoices";
import Settings from "./Settings";
import { useNavigate,useLocation } from 'react-router-dom';
import Offers from "./Offers";
import Unpaid from "./Unpaid";

const drawerWidth = 240;

function DashboardLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(true);
  const navigate = useNavigate();
  const handleLogout = () => {
    // Perform any logout logic here if necessary (like clearing tokens)
    navigate('/login'); // Navigate to login page
  };
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const headers = ["Number", "Client", "Date", "Expired Date", "Total", "Paid", "Status", "Payment"];

  // Process invoice data to get status counts
  const statusCounts = invoiceData.reduce((acc, invoice) => {
    acc[invoice.status] = (acc[invoice.status] || 0) + 1;
    return acc;
  }, {});

  const totalInvoices = invoiceData.length;

  const pieChartData = [
    { name: "Paid", value: statusCounts.Paid || 0 },
    { name: "Pending", value: statusCounts.Pending || 0 },
    { name: "Unpaid", value: statusCounts.Unpaid || 0 }
  ];

  const COLORS = ["#4caf50", "#ff9800", "#f44336"]; // Colors for Paid, Pending, and Unpaid

  const pieChartDataWithPercentage = pieChartData.map(item => ({
    ...item,
    percentage: ((item.value / totalInvoices) * 100).toFixed(2)
  }));
  const location = useLocation(); // Get the current location

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, link: "/" },
    { text: "Invoices", icon: <PeopleIcon />, link: "/invoices" },
    { text: "Proforma Invoices", icon: <AttachMoneyIcon />, link: "/proformainvoices" },
    { text: "Settings", icon: <SettingsIcon />, link: "/settings" },
  ];
  return (
      <div style={{ display: "flex" }}>
        {/* Top Bar */}
        <AppBar
          position="fixed"
          style={{ background: "#f5f5f5", color: "#000", zIndex: 1300 }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              ERP Dashboard
            </Typography>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <Avatar alt="Arofile Picture" src="/path/to/profile.jpg" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}

         <Drawer
          variant={isMobile ? "temporary" : "persistent"}
          open={drawerOpen}
          onClose={handleDrawerToggle}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <List>
            {[
              { text: "Dashboard", icon: <DashboardIcon />, link: "/" },
              { text: "Invoices", icon: <PeopleIcon />, link: "/invoices" },
              {
                text: "Proforma Invoices",
                icon: <AttachMoneyIcon />,
                link: "/proformainvoices",
              },
              { text: "Settings", icon: <SettingsIcon />, link: "/settings" },
            ].map((item, index) => (
              <ListItem button key={index} component={Link} to={item.link}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{color:'#000'}}/>
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginLeft: drawerOpen ? `${drawerWidth - 200}px` : 0,
            transition: "margin 0.3s",
          }}
        >
          <Toolbar />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  {/* Overview Cards */}
                  <Grid container spacing={2} style={{ marginTop: 20 }}>
                    {cardData.map((item, index) => (
                      <Grid item xs={3} key={index}>
                        <InfoCard
                          title={item.title}
                          subtitle={item.subtitle}
                          amount={item.amount}
                          amountColor={item.amountColor}
                          backgroundColor={item.backgroundColor}
                          borderColor={item.borderColor}
                        />
                      </Grid>
                    ))}
                  </Grid>

                  {/* Statistics and Customer Progress */}
                  <Grid container spacing={2} style={{ marginTop: 20 }}>
                    <Grid item xs={8}>
                      <Paper
                        style={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography variant="h6" style={{ padding: 10 }}>
                          Invoices
                        </Typography>
                        <InvoiceTable
                          headers={headers}
                          data={invoiceData.slice(0, 5)}
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper
                        style={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          textAlign: "center",
                          padding: 20,
                        }}
                      >
                        <Typography variant="h6">
                          Invoice Status Distribution
                        </Typography>
                        <ResponsiveContainer width="100%" height={200}>
                          <PieChart>
                            <Pie
                              data={pieChartDataWithPercentage}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              dataKey="value"
                            >
                              {pieChartDataWithPercentage.map(
                                (entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                  />
                                )
                              )}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                        <Box
                          display="flex"
                          justifyContent="space-around"
                          mt={2}
                        >
                          {pieChartDataWithPercentage.map((entry, index) => (
                            <Box key={index} display="flex" alignItems="center">
                              <Box
                                width={16}
                                height={16}
                                bgcolor={COLORS[index % COLORS.length]}
                                mr={1}
                              />
                              <Typography variant="body2">
                                {entry.name}: {entry.percentage}%
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </>
              }
            />
            <Route
              path="/settings"
              element={<Settings/>}
            />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/unpaid" element={<Unpaid />} />
            <Route path="/proformainvoices" element={<PerformaInvoice />} />
          </Routes>
        </Box>
      </div>
  );
}

export default DashboardLayout;
