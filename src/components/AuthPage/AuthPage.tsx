import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Container, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import socketIO from 'socket.io-client'

function AuthPage() {
  const [username, setUsername]= useState("")
  const [room, setRoom]= useState("")
  const navigate = useNavigate()
  const handleSubmit = () =>{
    if(room!="" && username!="")
    navigate(`/chat?room=${room}&username=${username}`)
  }
  return (
    <div>
      <Container component="main" maxWidth="xs" sx={{ mt: 3 }}>
        <Box sx={{marginTop: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight:""}}>
        <Avatar sx={{ m: 2, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" align="center">Войти в чат</Typography> 
        <TextField label="Имя (ник)" variant="outlined" margin="normal" required fullWidth type='email' onChange={(e=>setUsername(e.target.value))} value={username}/>
        <TextField label="Название комнаты" variant="outlined" margin="normal" required fullWidth onChange={(e=>setRoom(e.target.value))} value={room} />
        <Button type='submit' variant='contained' fullWidth sx={{ mt: 3 }} onClick={handleSubmit}>Вход</Button>
        </Box>
        </Container>
    </div>
  )
}

export default AuthPage