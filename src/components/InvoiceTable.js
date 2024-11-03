import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination
} from "@mui/material";

function InvoiceTable({ headers, data }) {
  const [page, setPage] = useState(0); // Pagination page state
  const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  // Slice data to show only the rows for the current page
  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Function to get background color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "#bef264"; // Green for Paid
      case "Pending":
        return "#fdba74"; // Orange for Pending
      case "Unpaid":
        return "#fca5a5"; // Red for Unpaid
      default:
        return "transparent"; // Default (no color)
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table style={{ textAlign: 'center' }}>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index} style={{ textAlign: 'center' }}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((row, index) => (
            <TableRow key={index}>
              {headers.map((header, idx) => {
                const value = row[header.toLowerCase().replace(/\s/g, "")];

                // If the current column is "Status", apply background color only to the value
                if (header === "Status") {
                  return (
                    <TableCell key={idx} style={{ textAlign: 'center' }}>
                      <span
                        style={{
                          backgroundColor: getStatusColor(value), // Apply the color
                          color: "#000", // Set text color to white for contrast
                          padding: '4px 8px', // Add some padding for better appearance
                          borderRadius: '4px', // Optional: rounded corners
                          display: 'block', // Ensure the span fits its content
                          textAlign: 'center', // Center the text horizontally
                        }}
                      >
                        {value}
                      </span>
                    </TableCell>
                  );
                }

                return <TableCell key={idx} style={{ textAlign: 'center' }}>{value}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Component */}
      <TablePagination
        component="div"
        count={data.length} // Total number of rows
        page={page} // Current page
        onPageChange={handleChangePage} // Function to handle page change
        rowsPerPage={rowsPerPage} // Rows per page
        onRowsPerPageChange={handleChangeRowsPerPage} // Function to handle rows per page change
        rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
      />
    </TableContainer>
  );
}

export default InvoiceTable;
