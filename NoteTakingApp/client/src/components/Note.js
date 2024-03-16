import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const Note = () => {
    const[notes,setNotes]=useState([])

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/notes`)
        .then(res=>setNotes(res.data))
        .catch(err=>console.log(err))
        },[])
    
    const handleDelete=(id)=>{
        axios.delete(`http://localhost:5000/api/notes/${id}`)
        .then(res=>{
            setNotes(notes.filter(note=>note._id!==id))
        
        }).catch(err=>console.log(err))
    }
  return (
    <div>
       <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Note App
          </Typography>
          <Button color="inherit" component={Link} to='/create'>Add Note</Button>
      </Toolbar>
      </AppBar>

      <div className='app'>
        {notes.map((note,index)=>(

            <Card key={index} sx={{ minWidth: 275 }}>
               <CardContent>
             <Typography variant="h5" component="div">
               {note.title}
             </Typography>

             <Typography sx={{ mb: 1.5 }} color="text.secondary">
             {note.content}
             </Typography>

             <Typography variant='h5' color="text.secondary" sx={{fontSize:'0.7rem',marginTop:'20px'}}>
              {note.date}
             </Typography>
              </CardContent>
              
              <CardActions>
                <Button component={Link} to={`/edit/${note._id}`} color='primary' variant='contained'>Edit</Button>
                <Button color='error' onClick={()=>handleDelete(note._id)} variant='contained'>Delete</Button>
         </CardActions>
               
                </Card>            
                
        ))}
      </div>
    </div>
  )
}

export default Note
