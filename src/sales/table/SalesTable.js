import React, { useState } from "react";
import {
  Toolbar,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Modal,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import InvoiceTable from "../../components/InvoiceTable";
import { invoiceData } from "../../data/invoiceData";
import CustomButton from "../../components/CustomeButton";

const SalesTable = () => {
  const navigate = useNavigate(); 
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility

  const headers = ["Number", "Client", "Date", "Due Date", "Total", "Paid", "Status", "Payment"];
  const handleNavigateToCreateInvoice = () => {
    navigate("/salescreate"); // Navigate to SalesCreate route
  };
  const getFilteredInvoices = () => {
    return invoiceData
      .filter((invoice) => {
        const matchesClient = invoice.client.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || invoice.status.toLowerCase() === statusFilter.toLowerCase();
        const matchesPayment = paymentFilter === "all" || invoice.payment.toLowerCase() === paymentFilter.toLowerCase();
        return matchesClient && matchesStatus && matchesPayment;
      })
      .sort((a, b) => {
        if (!sortField) return 0;
        const aValue = a[sortField];
        const bValue = b[sortField];
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
  };

  const handleSort = (field) => {
    const isAscending = sortField === field && sortDirection === "asc";
    setSortField(field);
    setSortDirection(isAscending ? "desc" : "asc");
  };

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <Box sx={{ marginTop: 20 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2, gap: 2 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Search by Client"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: 300, borderWidth: 2, background: "#fff" }}
          />
          <FormControl sx={{ width: 150, background: "#fff" }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="Paid">Paid</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Unpaid">Unpaid</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: 150, background: "#fff" }}>
            <InputLabel>Payment</InputLabel>
            <Select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              label="Payment"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Paypal">Paypal</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{width:200}}>
        <CustomButton
              onClick={handleNavigateToCreateInvoice}
              text="Create Sales Invoice"
              gradient="linear-gradient(45deg,#525cd9 , #8aa0ef)"
              color="#5e72e4"
            
            />
        </Box>
        
      </Toolbar>
      <InvoiceTable
        headers={headers}
        data={getFilteredInvoices()}
        onSort={handleSort}
        sortField={sortField}
        sortDirection={sortDirection}
      />
    </Box>
  );
};

export default SalesTable;
