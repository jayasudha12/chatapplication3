import React, { useState } from 'react';
import { Button, Container, Grid, Paper, TextField, Typography, Box } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Reset = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    // Check if new password and confirm password match
    if (newPassword === confirmPassword) {
      try {
        // Implement logic to handle password change
        console.log('Password changed successfully!');
        // Simulate API call or other asynchronous operation
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success('Password changed successfully!', {
          position: "top-right" // Position the toast at the top-right corner
        });
      } catch (error) {
        console.error('Error changing password:', error);
        toast.error('An error occurred while changing the password.');
      }
    } else {
      toast.error('Passwords do not match!');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 13 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ display: 'flex', overflow: 'hidden', borderRadius: '10px' }}>
            <Box sx={{ flex: 1, backgroundColor: 'primary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}>
              <img src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-5425.jpg" alt="Forgot Password" style={{ width: '90%', height: 'auto%' }} />
            </Box>
            <Box sx={{ flex: 1, padding: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <LockIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Reset Your Password
                </Typography>
              </Box>
              <TextField
                fullWidth
                type="email"
                label="Email"
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                type="password"
                label="New Password"
                variant="outlined"
                margin="normal"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                fullWidth
                type="password"
                label="Confirm New Password"
                variant="outlined"
                margin="normal"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Grid container spacing={2} justifyContent="space-between">
                <Grid item xs={12} sm={6}>
                  <Button onClick={handleChangePassword} fullWidth variant="contained" sx={{ mt: 2 }}>
                    Change 
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}> 
                  <Button onClick={() => navigate("/login")} fullWidth variant="contained" sx={{ mt: 2 }}>
                    Go to Login
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Container>
  );
};

export default Reset;
