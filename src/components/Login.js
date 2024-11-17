import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,Checkbox,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';// Adjust the path based on your project structure
import { styled } from "@mui/system";
const BackgroundWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundImage: `url('/bgIm.jpeg')`, // Replace with your image URL
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const LoginCard = styled(Box)(({ theme }) => ({
  width: "400px",
  padding: "2rem",
  paddingTop: "5rem",
  borderRadius: "10px",
  background: "rgba(255, 255, 255, 0.9)",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
  position:'relative'
}));

const SocialIconsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: "1rem",
  marginBottom: "1.5rem",
}));

const SocialIcon = styled(Box)(({ theme }) => ({
  width: "40px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  // background: "black",
  color: "white",
  fontWeight:'bold',
  cursor: "pointer",
  fontSize:22,
  "&:hover": {
    background: theme.palette.primary.main,
  },
}));
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
    // <Box
    //   display="flex"
    //   justifyContent="center"
    //   alignItems="center"
    //   height="100vh"
    //   bgcolor="#bae6fd"
      
    // >
    //   <Paper elevation={3} sx={{ padding: 4, width: 300, textAlign: 'center',borderRadius: '10px' }}>
    //     {/* <img
    //       src='erp.jpg'
    //       alt="ERP Logo"
    //       style={{ width: '100%', maxHeight: '100px', marginBottom: '16px' }}
    //     /> */}
    //     <Typography variant="h5" component="h1" gutterBottom>
    //       Login
    //     </Typography>
    //     <form onSubmit={handleSubmit}>
    //       <TextField
    //         label="Username"
    //         variant="outlined"
    //         fullWidth
    //         margin="normal"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //       />
    //       <TextField
    //         label="Password"
    //         variant="outlined"
    //         type="password"
    //         fullWidth
    //         margin="normal"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //       <Button
    //         type="submit"
    //         variant="contained"
    //         color="primary"
    //         fullWidth
    //         sx={{ mt: 2 }}
    //       >
    //         Login
    //       </Button>
    //     </form>
    //   </Paper>

    //   {/* Snackbar for success/error messages */}
    //   <Snackbar
    //     open={snackbarOpen}
    //     autoHideDuration={3000}
    //     onClose={handleCloseSnackbar}
    //     anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    //   >
    //     <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
    //       {snackbarMessage}
    //     </Alert>
    //   </Snackbar>
    // </Box>
    <BackgroundWrapper>
    <LoginCard>
      <Box sx={{position:'absolute',width:'90%',top:-20,left:20,borderRadius:3, background: 'linear-gradient(195deg,#42424a,#191919)',padding:2}}>
      <Typography variant="h5" align="center" gutterBottom sx={{color:'#fff',fontWeight:'bold'}}>
        Sign in
      </Typography>
      <SocialIconsWrapper>
        {/* <SocialIcon>f</SocialIcon>
        <SocialIcon>G</SocialIcon>
        <SocialIcon>Git</SocialIcon> */}
      </SocialIconsWrapper>
      </Box>
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        fullWidth
        type="password"
        label="Password"
        margin="normal"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Box display="flex" alignItems="center" my={2}>
        <Checkbox />
        <Typography>Remember me</Typography>
      </Box>
      <Button
        fullWidth
        variant="contained"
        sx={{
          background: "linear-gradient(195deg, #42424a, #191919);",
          "&:hover": { background: "#333" },
        }}
        onClick={handleSubmit}
      >
        Sign in
      </Button>
      <Typography
        variant="body2"
        align="center"
        mt={2}
        sx={{ color: "gray" }}
      >
        Don't have an account?{" "}
        <Typography
          component="span"
          sx={{ color: "red", cursor: "pointer" }}
        >
          Sign up
        </Typography>
      </Typography>
    </LoginCard>
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
  </BackgroundWrapper>
  );
}

export default Login;
