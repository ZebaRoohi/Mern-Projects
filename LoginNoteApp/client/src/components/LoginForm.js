import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, TextField, Button } from '@mui/material';

const LoginForm=() =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/api/user/login', { email, password })
            .then(response => {
                const { status, data } = response;
                if (status === 200) {
                    const { token } = data;
                    localStorage.setItem('token', `Bearer ${token}`);
                    navigate('/notes');
                } else {
                    console.error('Unexpected status code:', status);
                    alert('Invalid email or password. Please try again.');
                }
            })
            .catch(err => {
                console.log('Error in Login', err);
                alert('An error occurred. Please try again later.');
                
            });
    };

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', marginTop: 20, padding: 3, border: '1px solid #ccc', borderRadius: 5 }}>
            <Typography variant="h4" gutterBottom>
                Login Form
            </Typography>
            <form onSubmit={handleSubmit}>
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
                    Login
                </Button>
            </form>
        </Box>
    );
}
export default LoginForm;