import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Alert } from '@mui/material'; // Import Alert component

const RegistrationForm = ({ setLoggedIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertOpen, setAlertOpen] = useState(false); // State variable to control alert visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/user/register', { name, email, password });
      console.log(response.data);
      setLoggedIn(true);
      navigate('/login');
    } catch (err) {
      console.log('Error in Registration', err);
      if (err.response && err.response.status === 409 && err.response.data.message === 'User already registered with this email') {
        setAlertOpen(true); // Show the alert if the user is already registered with the same email
      } else {
        alert('User with this email is already registered. Please use a different email.');
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', marginTop: 20, padding: 3, border: '1px solid #ccc', borderRadius: 5 }}>
      <Typography variant="h4" gutterBottom>
        Registration Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Box>
  );
}

export default RegistrationForm;
