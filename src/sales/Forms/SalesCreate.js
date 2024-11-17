import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "../../components/CustomeButton";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BarcodeIcon from "@mui/icons-material/QrCodeScanner";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import EditIcon from "@mui/icons-material/Edit";

const SalesCreate = () => {
  const navigate = useNavigate();
  const [salesInvoiceDate, setSalesInvoiceDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [paymentTerms, setPaymentTerms] = useState(7);
  const [partyList] = useState([
    {
      name: "Party A",
      address: "Address A",
      emailId: "partya@example.com",
      mobileno: "1234567890",
      gstNo: "GST00001",
    },
    {
      name: "Party B",
      address: "Address B",
      emailId: "partyb@example.com",
      mobileno: "1234567891",
      gstNo: "GST00002",
    },
    {
      name: "Party C",
      address: "Address C",
      emailId: "partyc@example.com",
      mobileno: "1234567892",
      gstNo: "GST00003",
    },
    {
      name: "Party D",
      address: "Address D",
      emailId: "partyd@example.com",
      mobileno: "1234567893",
      gstNo: "GST00004",
    },
  ]);

  const [selectedParty, setSelectedParty] = useState(null);
  const [isEditingParty, setIsEditingParty] = useState(false);
  const [poMethod, setPoMethod] = useState(""); // Store the current input value
  const [isFocused, setIsFocused] = useState(false); // To manage visibility of suggestions

  const methods = ["verbal", "WhatsApp", "by hand", "email", "phone"]; // List of predefined methods

  const handleChange = (e) => {
    setPoMethod(e.target.value); // Update the input value as the user types
  };

  // Handles the selection of a suggestion from the list
  const handleSelect = (method) => {
    setPoMethod(method); // Set the selected suggestion into the TextField
    setIsFocused(false); // Hide suggestions after selection
  };
  const handleBack = () => {
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = () => {
    console.log("Save clicked");
  };

  const handlePaymentTermsChange = (e) => {
    const selectedTerms = parseInt(e.target.value, 10);
    setPaymentTerms(selectedTerms);

    // Update the due date based on payment terms
    const newDueDate = new Date(salesInvoiceDate);
    newDueDate.setDate(newDueDate.getDate() + selectedTerms);
    setDueDate(newDueDate);
  };

  const handlePartySelect = (party) => {
    setSelectedParty(party);
    setIsEditingParty(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        p={3}
        border="1px solid #e0e0e0"
        borderRadius={2}
        sx={{
          width: "100%",
          background: "#fff",
          marginTop: -8,
          borderRadius: 7,
          padding: 3,
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={handleBack}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6">Create Sales Invoice</Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <CustomButton
              onClick={handleCancel}
              text="Cancel"
              gradient="linear-gradient(45deg, #f8603b, #ff7e5f)"
              color="#ffc0c0"
              icon={CloseIcon}
            />
            <CustomButton
              onClick={handleSave}
              text="Save"
              gradient="linear-gradient(45deg,#525cd9 , #8aa0ef)"
              color="#5e72e4"
              icon={SaveIcon}
            />
          </Stack>
        </Box>

        <Grid container spacing={2}>
          {/* Bill To Section */}
          <Grid item xs={6} borderRight="1px solid #e0e0e0" pr={2}>
            <Typography
              variant="h6"
              sx={{ borderBottom: "1px solid #e0e0e0", mb: 2 }}
            >
              Bill To
            </Typography>
            {!selectedParty || isEditingParty ? (
              <Box>
                <TextField
                  placeholder="Search party"
                  fullWidth
                  size="small"
                  sx={{ mb: 2 }}
                />
                {partyList.slice(0, 3).map((party, index) => (
                  <Box
                    key={index}
                    onClick={() => handlePartySelect(party)}
                    sx={{
                      padding: 1,
                      cursor: "pointer",
                      background: "#f5f5f5",
                      mb: 1,
                      borderRadius: 1,
                      "&:hover": { background: "#e0e0e0" },
                    }}
                  >
                    {party.name}
                  </Box>
                ))}
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: 2,
                  background: "#f5f5f5",
                  borderRadius: 1,
                  position: "relative", // Add this to make it the reference for absolute positioning
                }}
              >
                <Box>
                  <Typography>Name: {selectedParty.name}</Typography>
                  <Typography>Address: {selectedParty.address}</Typography>
                  <Typography>Mobile No. : {selectedParty.mobileno}</Typography>
                  <Typography>GST NO. : {selectedParty.gstNo}</Typography>
                </Box>
                <IconButton
                  onClick={() => setIsEditingParty(true)}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Box>
            )}
          </Grid>

          {/* Invoice Details */}
          <Grid item xs={6} pl={2}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  label="Invoice Prefix"
                  fullWidth
                  size="small"
                  defaultValue="MC/2425/"
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Invoice Number"
                  fullWidth
                  size="small"
                  defaultValue="39"
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                sx={{width: 320}}
                  label="Sales Invoice Date"
                  value={salesInvoiceDate}
                  onChange={(date) => setSalesInvoiceDate(date)}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth size="small" />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  label="Payment Terms"
                  fullWidth
                  size="small"
                  value={paymentTerms}
                  onChange={handlePaymentTermsChange}
                  sx={{
                    '& .MuiInputBase-root': {
                      padding: 1,
                    },
                  }}
                >
                  {[7, 15, 30, 90].map((term) => (
                    <MenuItem key={term} value={term} >
                      {term} days
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                sx={{width: 320}}
                  label="Due Date"
                  value={dueDate}
                  fullWidth
                  onChange={(date) => setDueDate(date)}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth size="small" />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="PO No:"
                  fullWidth
                  size="small"
                  value={poMethod}
                  onChange={handleChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  sx={{
                    '& .MuiInputBase-root': {
                      padding: 1,
                    },
                  }}
                />
                {/* Display suggestions below the TextField if it's focused */}
                {isFocused && (
                  <Paper
                    elevation={3}
                    style={{ maxHeight: 200, overflowY: "auto", marginTop: 4 }}
                  >
                    <List>
                      {methods.map((method) => (
                        <ListItem
                          button
                          key={method}
                          onClick={() => handleSelect(method)} // Set the selected suggestion
                        >
                          <ListItemText primary={method} />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* Footer Section */}
        {/* Items/Services Table */}
        <Box mt={3} borderTop="1px solid #e0e0e0" pt={2}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={1}>
              <Typography variant="body2" fontWeight="bold">
                NO
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" fontWeight="bold">
                ITEMS/SERVICES
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" fontWeight="bold">
                HSN/SAC
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="body2" fontWeight="bold">
                QTY
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" fontWeight="bold">
                PRICE/ITEM (₹)
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="body2" fontWeight="bold">
                DISCOUNT
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="body2" fontWeight="bold">
                TAX
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="body2" fontWeight="bold">
                AMOUNT (₹)
              </Typography>
            </Grid>
          </Grid>
          {/* Add Item Row */}
          <Grid container spacing={2} alignItems="center" mt={2}>
            <Grid item xs={12} md={11}>
              <Box
                border="1px dashed #9e9e9e"
                borderRadius={1}
                p={2}
                sx={{
                  textAlign: "center",
                  color: "#1976d2",
                  cursor: "pointer",
                }}
              >
                + Add Item
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box mt={3} display="flex" justifyContent="space-between">
          <Box>
            <Button size="small" color="primary" sx={{ textTransform: "none" }}>
              + Add Notes
            </Button>
            <Button size="small" color="primary" sx={{ textTransform: "none" }}>
              + Add Terms and Conditions
            </Button>
          </Box>
          <Typography variant="h6">₹ 0</Typography>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default SalesCreate;
