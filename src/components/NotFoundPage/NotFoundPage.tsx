import React from 'react'
import Container from '@mui/material/Container';
import { Link, Typography } from '@mui/material';
import { Box } from '@mui/system';

function NotFoundPage() {
  return (
    <div>
      <Container maxWidth="sm" sx={{textAlign:'center'}} >
        <Box>
        <Typography sx={{color: '#aaaaaa', mt: '50%', mb: '5%'}} variant='h3'>Страница не найдена</Typography>
      <Link href='/'>Вернуться на главную</Link>
      </Box>
      </Container>
      
      </div>
  )
}

export default NotFoundPage