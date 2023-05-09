import Header from './elements/Header'
import * as io from "socket.io-client";
import { useEffect } from 'react'
import React, { useState } from 'react'
import { Container } from '@mui/system'
import EmojiPicker from 'emoji-picker-react'
import { useLocation } from 'react-router-dom'
import {Box, Button, TextField, Typography } from '@mui/material'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'

function ChatPage() {
  const { search } = useLocation()
  const searchParams = Object.fromEntries(new URLSearchParams(search))
  const [messages, setMessages] = useState<string[]>([])
  const [newMessage, setNewMessage] = useState<string>("")
  const [state, setState] = useState<Array<MessageItem>>([])
  const [isEmojiOpen, setEmojiOpen] = useState(false)
  const [usersCount, setUsersCount] = useState(0)
  const [users, setUsers] = useState([])
  const socket = io.connect(`http://localhost:5000`);
  
  useEffect(()=>{ socket.emit('join', searchParams) },[search])
  useEffect(()=>{ 
    socket.on('message',({username, message})=>{
    const data = {username: username, message: message}
    setState((_state)=>([..._state, data]))
  }) 
  },[])
  useEffect(()=>{
    socket.on('getUsers',(items)=>{
      setUsers(items)
      setUsersCount(items.length)
    })
  },[state])

  interface MessageItem{
    username: string,
    message: string,
  }

  return (
    <div>
      <Header username={searchParams.username} room={searchParams.room}/>
      <Container maxWidth='md'>
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
          <Box>
            <Box sx={{display:'flex', justifyContent:'space-between'}}>
            <Typography>Чат {searchParams.room}</Typography>
            <Typography> {usersCount} в сети </Typography>
            </Box>           
            <Container sx={{display:'flex', flexDirection:'column', justifyContent:'end', ml:2, height:'80vh',overflowY:'scroll', whiteSpace:'nowrap', border:'1px solid lightgray', borderRadius:'10px'}}>     
            {state.length!=0 && state.map((item, index)=>{
              const isMyMsg = item.username === searchParams.username
              const alignMsg = isMyMsg ? "right" : "left"
              const bgColorMsg = isMyMsg ? "green" : "blue"
              return <Box><Typography sx={{textAlign:alignMsg, color:bgColorMsg, borderRadius:'10px'}} key={index}>{item.username}: {item.message}</Typography></Box>
              
            })}
            </Container>
          </Box>
          <Box sx={{ml:1, mt:1}}>
            <TextField id="standard-basic" variant="standard" value={newMessage} onChange={(e)=>{setNewMessage(e.target.value)}}/>
            <SentimentVerySatisfiedIcon sx={{cursor:'pointer'}} onClick={()=>{setEmojiOpen(!isEmojiOpen)}}/>
            {isEmojiOpen && <EmojiPicker onEmojiClick={({emoji})=>{setNewMessage(`${newMessage} ${emoji}`); setEmojiOpen(false)}}/>}
            <Button type='submit' onClick={()=>{socket.emit('sendMessage', newMessage, searchParams.username, searchParams.room); messages.push(newMessage); setNewMessage("")}}sx={{ml:2}}>Отправить</Button>
          </Box>
        </Box>
      </Container>
    </div>
  )
}

export default ChatPage