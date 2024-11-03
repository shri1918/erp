// src/components/Settings.js
import React from 'react';
import { Container, Box } from '@mui/material';

const Offers = () => {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <img src="/working.jpg" alt="Offers" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </Box>
    </Container>
  );
};

export default Offers;
