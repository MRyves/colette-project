import { Box, Grid, Link, Typography } from '@mui/material';
import React from 'react';
import { FooterContainer, myTheme } from '../../theme/my-theme';

const Footer = () => {
  return (
    <Box sx={{ background: myTheme.palette.secondary.main }}>
      <FooterContainer maxWidth="lg">
        <Grid container justifyContent={'space-between'}>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item>
                <Link href="/imprint">
                  <Typography
                    variant="body1"
                    sx={{ 
                      color: myTheme.palette.primary.contrastText,
                      transition: '.3s ease-out',
                      '&:hover': {
                        color: myTheme.palette.primary.dark,
                      },                    }}
                  >
                    Impressum
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/baking">
                  <Typography
                    variant="body1"
                    sx={{ 
                      color: myTheme.palette.primary.contrastText,
                      transition: '.3s ease-out',
                      '&:hover': {
                        color: myTheme.palette.primary.dark,
                      },                    }}
                  >
                    Backen
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/cooking">
                  <Typography
                    variant="body1"
                    sx={{ 
                      color: myTheme.palette.primary.contrastText,
                      transition: '.3s ease-out',
                      '&:hover': {
                        color: myTheme.palette.primary.dark,
                      },                    }}
                  >
                    Kochen
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography
              variant="body1"
              sx={{ color: myTheme.palette.primary.contrastText }}
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
