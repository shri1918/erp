// src/components/Settings.js
import React from 'react';
import { Container, Box } from '@mui/material';

const Unpaid = () => {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <img src="/working.jpg" alt="Unpaid" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </Box>
    </Container>
  );
};

export default Unpaid;
