import React from "react";
import { Toolbar, Box, AppBar } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Invoices from "../components/Invoices";
import PerformaInvoice from "../components/ProformaInvoices";
import Settings from "../components/Settings";
import Offers from "../components/Offers";
import Unpaid from "../components/Unpaid";
import Cards from "./cards/Cards";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import SpliteScreen from "./SpliteDashboard.js/SpliteScreen";
import Sales from "../sales/Sales";
import SalesCreate from "../sales/Forms/SalesCreate";

function DashboardLayout() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        background: "#f2f3f5",
      }}
    >
      <TopBar />

      <SideBar />
      <Box
        component="main"
        sx={{
          zIndex: 1300,
          flexGrow: 1,
          p: 2,
          marginLeft:'17%',
          transition: "margin 0.3s",
        }}
      >
        <Toolbar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Box>
                <Cards />
                <SpliteScreen />
              </Box>
            }
          />
          <Route path="/settings" element={<Settings />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/unpaid" element={<Unpaid />} />
          <Route path="/salescreate" element={<SalesCreate />} />
          <Route path="/proformainvoices" element={<PerformaInvoice />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default DashboardLayout;
