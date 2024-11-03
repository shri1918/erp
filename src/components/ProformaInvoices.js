import React, { useState } from 'react';
import { Typography, Grid, Paper, Box, MenuItem, Select } from '@mui/material';
import InvoiceTable from './InvoiceTable';
import { proformaInvoiceData } from '../data/invoiceData';
import { Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, AreaChart, Area } from 'recharts';


const getGroupedData = (data, filter) => {
  const groupByTimePeriod = (date, period) => {
    const d = new Date(date);
    switch (period) {
      case 'day':
        return d.toISOString().split('T')[0]; // YYYY-MM-DD
      case 'week':
        const startOfWeek = new Date(d.setDate(d.getDate() - d.getDay()));
        return startOfWeek.toISOString().split('T')[0]; // Start of the week YYYY-MM-DD
      case 'month':
        return d.toLocaleString('default', { month: 'long', year: 'numeric' }); // Month Year
      case 'year':
        return d.getFullYear().toString(); // Just the year
      default:
        return date;
    }
  };

  const groupedTotals = data.reduce((acc, invoice) => {
    const timePeriod = groupByTimePeriod(invoice.date, filter);
    const totalValue = parseFloat(invoice.total.replace(/[$,]/g, ''));

    if (acc[timePeriod]) {
      acc[timePeriod] += totalValue;
    } else {
      acc[timePeriod] = totalValue;
    }

    return acc;
  }, {});

  return Object.keys(groupedTotals).map(period => ({
    period,
    total: groupedTotals[period],
  }));
};

const PerformaInvoices = () => {
  const headers = [
    'Number', 'Client', 'Date', 'Expired Date', 'Total', 'Paid', 'Status', 'Payment'
  ];

  const [timeFilter, setTimeFilter] = useState('day'); // Set default filter to 'day'
  const [chartType, setChartType] = useState('line'); // Set default chart type to 'line'

  const handleFilterChange = (event) => {
    setTimeFilter(event.target.value);
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  // Process invoice data for the chart
  const filteredData = getGroupedData(proformaInvoiceData, timeFilter);

  return (
    <div>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <Grid item xs={12}>
          <Paper
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" style={{ padding: 10 }}>
              Performa Invoices
            </Typography>
            <InvoiceTable headers={headers} data={proformaInvoiceData} />
          </Paper>
        </Grid>
      </Grid>

      {/* Chart with Filter */}
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <Grid item xs={12}>
          <Paper
            style={{
              padding: 20,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" style={{ marginBottom: 20 }}>
              Total Performa Invoices Over Time
            </Typography>

            {/* Dropdown filters for day, week, month, year and chart type */}
            <Box display="flex" justifyContent={"space-between"} mb={2}>
              <Select value={timeFilter} onChange={handleFilterChange}>
                <MenuItem value="day">Day</MenuItem>
                <MenuItem value="week">Week</MenuItem>
                <MenuItem value="month">Month</MenuItem>
                <MenuItem value="year">Year</MenuItem>
              </Select>

              <Select value={chartType} onChange={handleChartTypeChange}>
                <MenuItem value="line">Line Chart</MenuItem>
                <MenuItem value="bar">Bar Chart</MenuItem>
                <MenuItem value="area">Area Chart</MenuItem>
              </Select>
            </Box>

            {/* Render different chart types based on the selected chartType */}
            <ResponsiveContainer width="100%" height={400}>
              {chartType === 'line' && (
                <LineChart
                  data={filteredData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="total" stroke="#8884d8" />
                </LineChart>
              )}

              {chartType === 'bar' && (
                <BarChart
                  data={filteredData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#8884d8" />
                </BarChart>
              )}

              {chartType === 'area' && (
                <AreaChart
                  data={filteredData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default PerformaInvoices;
