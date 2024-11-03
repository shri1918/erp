import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';// Adjust the path based on your project structure

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) {
      if (username === 'admin' && password === 'admin123') {
        setSnackbarMessage('Login successful!');
        setSnackbarSeverity('success');
        onLogin({ username, password });
      } else {
        setSnackbarMessage('Invalid credentials, please try again.');
        setSnackbarSeverity('error');
      }
      setSnackbarOpen(true);
    } else {
      console.error("onLogin function is not defined.");
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#bae6fd"
      
    >
      <Paper elevation={3} sx={{ padding: 4, width: 300, textAlign: 'center',borderRadius: '10px' }}>
        {/* <img
          src='erp.jpg'
          alt="ERP Logo"
          style={{ width: '100%', maxHeight: '100px', marginBottom: '16px' }}
        /> */}
        <Typography variant="h5" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Paper>

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Login;
