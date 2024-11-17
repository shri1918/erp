import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
} from "@mui/material";

function InvoiceTable({ headers, data, onSort, sortField, sortDirection }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = (data || []).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "#bef264";
      case "Pending":
        return "#fdba74";
      case "Unpaid":
        return "#fca5a5";
      default:
        return "transparent";
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index} style={{ textAlign: "center" }}>
                {["Date", "Due Date"].includes(header) ? (
                  <TableSortLabel
                    active={sortField === header.toLowerCase().replace(/\s/g, "")}
                    direction={sortField === header.toLowerCase().replace(/\s/g, "") ? sortDirection : "asc"}
                    onClick={() => onSort(header.toLowerCase().replace(/\s/g, ""))}
                  >
                    {header}
                  </TableSortLabel>
                ) : (
                  header
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((row, index) => (
            <TableRow key={index}>
              {headers.map((header, idx) => {
                const value = row[header.toLowerCase().replace(/\s/g, "")];
                if (header === "Status") {
                  return (
                    <TableCell key={idx} style={{ textAlign: "center" }}>
                      <span
                        style={{
                          backgroundColor: getStatusColor(value),
                          color: "#000",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          display: "block",
                          textAlign: "center",
                        }}
                      >
                        {value}
                      </span>
                    </TableCell>
                  );
                }
                return <TableCell key={idx} style={{ textAlign: "center" }}>{value}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </TableContainer>
  );
}

export default InvoiceTable;
