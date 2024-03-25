import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const Note = () => {
    const [notes, setNotes] = useState([]);
    const [token, setToken] = useState('');
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const tokenFromStorage = localStorage.getItem('token');
        if (!tokenFromStorage) {
            navigate('/login');
            return;
        }

        const token = tokenFromStorage.split(' ')[1];
        setToken(token);

        axios.get('http://localhost:3000/api/notes', {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        .then(res => {
            console.log('Response data:', res.data);
            setNotes(res.data);
        })
        .catch(err => console.log('Error fetching notes:', err));

        axios.get('http://localhost:3000/api/user/info', {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        .then(res => {
            console.log('User info:', res.data);
            setUserName(res.data.email); // Assuming the endpoint returns email
        })
        .catch(err => console.log('Error fetching user info:', err));
    }, [navigate, token]);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/api/notes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(res => {
            setNotes(notes.filter(note => note._id !== id));
        })
        .catch(err => console.log(err));
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Note App
                    </Typography>
                    {userName && <Typography variant="subtitle1" sx={{ marginRight: 2 }}>Welcome, {userName}</Typography>}
                    <Button color="inherit" component={Link} to='/create'>Add Note</Button>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>

            <div className='app'>
                {notes.map((note, index) => (
                    <Card key={index} sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {note.title}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {note.content}
                            </Typography>
                            <Typography variant='h5' color="text.secondary" sx={{ fontSize: '0.7rem', marginTop: '20px' }}>
                                {note.date}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button component={Link} to={`/edit/${note._id}`} color='primary' variant='contained'>Edit</Button>
                            <Button color='error' onClick={() => handleDelete(note._id)} variant='contained'>Delete</Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Note;
