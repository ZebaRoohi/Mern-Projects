import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button, TextField } from '@mui/material';

const UpdateNote = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (!tokenFromStorage) {
      navigate('/login');
      return;
    }
    const token = tokenFromStorage.split(' ')[1];
    setToken(token);

    axios.get(`http://localhost:3000/api/notes/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
      .then(res => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch(err => console.log(err));

  }, [id, navigate, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/api/notes/${id}`, { title, content }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
      .then(res => navigate('/notes'))
      .catch(err => console.log(err));
  };

  return (
    <Box sx={{ width: 500, margin: '20px' }}>
      <Typography variant="h5">
        Update Notes
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} margin='normal' />
        <TextField fullWidth label="Content" variant="outlined" value={content} onChange={(e) => setContent(e.target.value)} rows={4} margin='normal' multiline />
        <Button type='submit' variant='contained' color='primary'>Submit</Button>
      </form>
    </Box>
  );
};

export default UpdateNote;
