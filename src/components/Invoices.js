import React, { useState } from 'react';
import { Typography, Grid, Paper, Box, MenuItem, Select } from '@mui/material';
import InvoiceTable from './InvoiceTable';
import { invoiceData } from '../data/invoiceData';
import {
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#d84a5b'];

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

const Invoices = () => {
  const headers = [
    'Number', 'Client', 'Date', 'Expired Date', 'Total', 'Paid', 'Status', 'Payment'
  ];

  const [timeFilter, setTimeFilter] = useState('day'); // Set default filter to 'day'
  const [chartType, setChartType] = useState('line'); // Set default chart type to 'line'

  // Function to handle filter change
  const handleFilterChange = (event) => {
    setTimeFilter(event.target.value);
  };

  // Function to handle chart type change
  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  // Process invoice data for the selected chart type
  const filteredData = getGroupedData(invoiceData, timeFilter);

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
              Invoices
            </Typography>
            <InvoiceTable headers={headers} data={invoiceData} />
          </Paper>
        </Grid>
      </Grid>

      {/* Chart with Filter and Chart Type Selector */}
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <Grid item xs={12}>
          <Paper
            style={{
              padding: 20,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" style={{ marginBottom: 20 }}>
              Total Invoices Over Time
            </Typography>

            <Box display="flex" justifyContent="space-between" mb={2}>
              {/* Dropdown filter for day, week, month, year */}
              <Select value={timeFilter} onChange={handleFilterChange}>
                <MenuItem value="day">Day</MenuItem>
                <MenuItem value="week">Week</MenuItem>
                <MenuItem value="month">Month</MenuItem>
                <MenuItem value="year">Year</MenuItem>
              </Select>

              {/* Dropdown to select chart type */}
              <Select value={chartType} onChange={handleChartTypeChange}>
                <MenuItem value="line">Line Chart</MenuItem>
                <MenuItem value="bar">Bar Chart</MenuItem>
                <MenuItem value="area">Area Chart</MenuItem>
                <MenuItem value="pie">Pie Chart</MenuItem>
              </Select>
            </Box>

            <ResponsiveContainer width="100%" height={400}>
              {chartType === 'line' && (
                <LineChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              )}
              {chartType === 'bar' && (
                <BarChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#82ca9d" />
                </BarChart>
              )}
              {chartType === 'area' && (
                <AreaChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              )}
              {chartType === 'pie' && (
                <PieChart>
                  <Pie
                    data={filteredData}
                    dataKey="total"
                    nameKey="period"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    label
                  >
                    {filteredData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              )}
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Invoices;
