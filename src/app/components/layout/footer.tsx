import { Box, Grid, Link, Typography } from '@mui/material';
import React from 'react';
import { FooterContainer } from '../../theme/my-theme';

const Footer = () => {
  return (
    <Box sx={{ background: '#c58b64' }}>
      <FooterContainer maxWidth="lg">
        <Grid container justifyContent={'space-between'}>
          <Grid item sm={12} md={6}>
            <Grid container spacing={3}>
              <Grid item>
                <Link href="/imprint">
                  <Typography variant="body2">Impressum</Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/baking">
                  <Typography variant="body2">Backen</Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/cooking">
                  <Typography variant="body2">Kochen</Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              © Copyright 2024, Colette Güntensperger
            </Typography>
          </Grid>
        </Grid>
      </FooterContainer>
    </Box>
  );
};

export default Footer;
