import React from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import InfoCard from "./InfoCard";
export default function SalesCards({ cardsData }) {
  return (
    <Grid container spacing={2} style={{ marginTop: -40,position:'fixed',background:'#5e72e4',zIndex:1300,paddingBottom: 30}}>
    {cardsData.map((item, index) => (
      <Grid item xs={3} key={index}>
        <InfoCard
          title={item.title}
          amount={item.amount}
          icon={item.icon}
        />
      </Grid>
    ))}
  </Grid>
  );
}
{/* <Grid container spacing={3} style={{ marginTop: -40 }}>
{cardsData.map((item, index) => (
  <Grid item xs={12} sm={6} md={3} key={index}>
    <Card
      style={{
        cursor: "pointer",
        padding: 15,
        borderRadius: 15,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6">{item.title}</Typography>
          <Box  color="#4e3f94">
            {item.icon}
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography color="textSecondary">This Month</Typography>
          <Typography
            style={{
              color: "#4e3f94",
              backgroundColor: "#ebedfc",
              padding: "5px 8px",
              borderRadius: "10px",
              border: "1px solid #4e3f94",
            }}
          >
            {item.amount}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  </Grid>
))}
</Grid> */}