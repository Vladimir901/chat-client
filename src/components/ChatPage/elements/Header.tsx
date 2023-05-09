import * as io from "socket.io-client";
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { AppBar, Avatar, Menu, MenuItem, Toolbar, Typography } from '@mui/material';

function Header({username, room}: {username:string, room:string}) {
const navigate = useNavigate()
  const [isAuth, setIsAuth] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const socket = io.connect(`http://localhost:5000`);
  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }
  const leaveTheRoom = () =>{
    handleClose()
    socket.emit('leaveChat', username, room)
    navigate('/auth')
  }
  return (
    <AppBar position='static'>
        <Toolbar>  
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Чат</Typography>
          <Avatar sx={{ bgcolor: '#ffffff', color: '#000000', mr:2, cursor:'pointer' }} onClick={handleClick}>{username[0]}</Avatar>
          <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}
        MenuListProps={{'aria-labelledby': 'basic-button'}}>
            <MenuItem onClick={()=>{ handleClose(); leaveTheRoom(); }}>
              <LogoutIcon sx={{mr:1}}/>            
              Выйти
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
  )
}

export default Header