import { AppBar, Box, Container, Typography } from '@mui/material'
import React from 'react'
import AppRoutes from '../routes/routes'

const Footer = () => {
  return (
    <>
    <Box bgcolor="secondary.main">
      <Container maxWidth="lg">
        <Typography>Kochen, Backen, Impressum</Typography>
      </Container>
    </Box>
      <AppBar position="static" elevation={0}>
          <Container maxWidth="lg">
              <p>© Copyright 2024, Colette Güntensperger</p>
          </Container>
      </AppBar>
    </>


  )
}

export default Footer