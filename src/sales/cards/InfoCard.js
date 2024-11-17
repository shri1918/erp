import React from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom';

const InfoCard = ({ title, amount, icon, }) => {


  return (
    <Card style={{ cursor: 'pointer',padding:15,borderRadius:15 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">{title}</Typography>
            {icon}
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography color="textSecondary">This Month</Typography>
          <Typography
            style={{
              color: "#4e3f94",
              backgroundColor: "#ebedfc",
              paddingRight: '10px',
              borderRadius: '10px',
              paddingLeft: '10px',
              borderColor: "#ebedfc",
              borderStyle: 'solid',
              borderWidth: '1px',
            }}
          >
            {amount}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
