import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const CreateNote = () => {
    const[title,setTitle]=useState('')
    const[content,setContent]=useState('')
    const navigate=useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:5000/api/notes',{title,content})
        .then(res=>navigate('/'))
        .catch(err=>console.log(err))
    }
  return (
    <Box sx={{width:500,margin:'20px'}}>
         <Typography variant="h6" >
          Add Notes
          </Typography>
      <form onSubmit={handleSubmit}>
      <TextField fullWidth label="Title" variant="outlined" value={title} onChange={(e)=>setTitle(e.target.value)} margin='normal'/>

      <TextField fullWidth label="Content" variant="outlined" value={content} onChange={(e)=>setContent(e.target.value)} rows={4} margin='normal' multiline/>
    
    <Button type='submit' variant='contained' color='primary'>Submit </Button>
        
      </form>
    </Box>
  )
}

export default CreateNote
