import { Box, Grid, Link, Typography } from '@mui/material';
import React from 'react';
import { Colors, FooterContainer } from '../../theme/my-theme';

const Footer = () => {
  return (
    <Box sx={{ background: Colors.secondary.main }}>
      <FooterContainer maxWidth="lg">
        <Grid container justifyContent={'space-between'}>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item>
                <Link href="/">
                  <Typography
                    variant="body1"
                    sx={{ 
                      color: Colors.primary.contrastText,
                      transition: '.3s ease-out',
                      '&:hover': {
                        color: Colors.primary.dark,
                      },                    }}
                  >
                    Startseite
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/imprint">
                  <Typography
                    variant="body1"
                    sx={{ 
                      color: Colors.primary.contrastText,
                      transition: '.3s ease-out',
                      '&:hover': {
                        color: Colors.primary.dark,
                      },                    }}
                  >
                    Impressum
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography
              variant="body1"
              sx={{ color: Colors.primary.contrastText }}
            >
              © Copyright 2024, Chuchiblog
            </Typography>
          </Grid>
        </Grid>
      </FooterContainer>
    </Box>
  );
};

export default Footer;
