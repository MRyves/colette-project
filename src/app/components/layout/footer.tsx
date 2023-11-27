import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { PaddContainer } from '../../theme/my-theme';


const Footer = () => {

  return (
    <>
      <Box bgcolor="#cab093">
        <PaddContainer maxWidth="lg">
          <Typography>Kochen, Backen, Impressum</Typography>
        </PaddContainer>
      </Box>
      <Box bgcolor="#000000">
        <PaddContainer maxWidth="lg">
          <Typography variant='body2'>© Copyright 2024, Colette Güntensperger</Typography>
        </PaddContainer>
      </Box>
    </>
  );
}

export default Footer;
