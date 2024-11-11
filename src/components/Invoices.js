import React, { useState } from 'react';
import { Typography, Grid, Paper, Box, MenuItem, Select, TextField } from '@mui/material';
import InvoiceTable from './InvoiceTable';
import { invoiceData } from '../data/invoiceData';
import Chart from 'react-apexcharts';

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

  const [timeFilter, setTimeFilter] = useState('day'); // Default filter to 'day'
  const [chartType, setChartType] = useState('line'); // Default chart type to 'line'
  const [searchQuery, setSearchQuery] = useState(''); // State for client search
  const [statusFilter, setStatusFilter] = useState('all'); // State for status filter

  // Function to handle filter change
  const handleFilterChange = (event) => {
    setTimeFilter(event.target.value);
  };

  // Function to handle chart type change
  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  // Function to handle client search change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle status filter change
  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  // Function to apply client search and status filter
  const getFilteredInvoices = () => {
    return invoiceData.filter(invoice => {
      const matchesClient = invoice.client.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || invoice.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesClient && matchesStatus;
    });
  };

  // Process invoice data for the selected chart type
  const filteredData = getGroupedData(getFilteredInvoices(), timeFilter);
  const categories = filteredData.map(data => data.period);
  const seriesData = filteredData.map(data => data.total);

  // Chart options
  const chartOptions = {
    chart: {
      id: 'invoice-chart',
    },
    xaxis: {
      categories: categories,
    },
    colors: COLORS,
  };

  return (
    <div>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <Grid item xs={12}>
          <Paper
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              padding: 20,
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Invoices</Typography>
             
            </Box>
            <InvoiceTable headers={headers} data={getFilteredInvoices()} />
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
                <MenuItem value="pie">Pie Chart</MenuItem>
              </Select>
            </Box>

            <div>
              {chartType === 'line' && (
                <Chart
                  options={chartOptions}
                  series={[{ name: 'Total', data: seriesData }]}
                  type="line"
                  height={400}
                />
              )}
              {chartType === 'bar' && (
                <Chart
                  options={chartOptions}
                  series={[{ name: 'Total', data: seriesData }]}
                  type="bar"
                  height={400}
                />
              )}
              {chartType === 'area' && (
                <Chart
                  options={chartOptions}
                  series={[{ name: 'Total', data: seriesData }]}
                  type="area"
                  height={400}
                />
              )}
              {chartType === 'pie' && (
                <Chart
                  options={{
                    labels: categories,
                    colors: COLORS,
                  }}
                  series={seriesData}
                  type="pie"
                  height={400}
                />
              )}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Invoices;
