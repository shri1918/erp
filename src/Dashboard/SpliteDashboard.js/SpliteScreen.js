import React from "react";
import { Typography, Grid, Paper, Box } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import InvoiceTable from "../../components/InvoiceTable";
import { invoiceData } from "../../data/invoiceData";
export default function SpliteScreen() {
  const headers = [
    "Number",
    "Client",
    "Date",
    "Expired Date",
    "Total",
    "Paid",
    "Status",
    "Payment",
  ];
  const statusCounts = invoiceData.reduce((acc, invoice) => {
    acc[invoice.status] = (acc[invoice.status] || 0) + 1;
    return acc;
  }, {});

  const totalInvoices = invoiceData.length;

  const pieChartData = [
    { name: "Paid", value: statusCounts.Paid || 0 },
    { name: "Pending", value: statusCounts.Pending || 0 },
    { name: "Unpaid", value: statusCounts.Unpaid || 0 },
  ];

  const COLORS = ["#4caf50", "#ff9800", "#f44336"]; // Colors for Paid, Pending, and Unpaid

  const pieChartDataWithPercentage = pieChartData.map((item) => ({
    ...item,
    percentage: ((item.value / totalInvoices) * 100).toFixed(2),
  }));
  return (
    <Grid container spacing={2} style={{ marginTop: 50 }}>
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
          <InvoiceTable headers={headers} data={invoiceData.slice(0, 5)} />
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
          <Typography variant="h6">Invoice Status Distribution</Typography>
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
                {pieChartDataWithPercentage.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <Box display="flex" justifyContent="space-around" mt={2}>
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
  );
}
