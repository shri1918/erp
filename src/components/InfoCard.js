import React from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom';

const InfoCard = ({ title, subtitle, amount, amountColor, backgroundColor, borderColor }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/${title.toLowerCase()}`);
  };

  return (
    <Card onClick={handleNavigate} style={{ cursor: 'pointer' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">{title}</Typography>
          <IconButton onClick={handleNavigate} aria-label="open">
            <OpenInNewIcon />
          </IconButton>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography color="textSecondary">{subtitle}</Typography>
          <Typography
            style={{
              color: amountColor,
              backgroundColor: backgroundColor,
              paddingRight: '10px',
              borderRadius: '10px',
              paddingLeft: '10px',
              borderColor: borderColor,
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
