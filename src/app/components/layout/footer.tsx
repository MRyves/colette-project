import { Box, Typography } from '@mui/material';
import React from 'react';
import { FooterButton, PaddContainer } from '../../theme/my-theme';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <Box bgcolor="#cab093">
        <PaddContainer maxWidth="lg">
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <FooterButton>
              <Link to={'/imprint'}>
                <Typography>Impressum</Typography>
              </Link>
            </FooterButton>
            <FooterButton>
              <Link to={'/backing'}>
                <Typography>Backen</Typography>
              </Link>
            </FooterButton>
            <FooterButton>
              <Link to={'/cooking'}>
                <Typography>Kochen</Typography>
              </Link>
            </FooterButton>
          </Box>
        </PaddContainer>
      </Box>
      <Box bgcolor="#000000">
        <PaddContainer maxWidth="lg">
          <Typography variant="body2">
            © Copyright 2024, Colette Güntensperger
          </Typography>
        </PaddContainer>
      </Box>
    </>
  );
};

export default Footer;
