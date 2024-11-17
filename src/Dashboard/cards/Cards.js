import React from 'react'
import {Grid,}from "@mui/material";
import InfoCard from './InfoCard';
import cardData from '../../data/cardData';
export default function Cards() {
  return (
    <Grid container spacing={1} sx={{marginTop:3}}>
    {cardData.map((item, index) => (
      <Grid item xs={3} key={index}>
        <InfoCard
          title={item.title}
          subtitle={item.subtitle}
          amount={item.amount}
          amountColor={item.amountColor}
          backgroundColor={item.backgroundColor}
          borderColor={item.borderColor}
        />
      </Grid>
    ))}
  </Grid>
  )
}
