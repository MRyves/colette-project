import React from 'react'
import { AppBar, Container, Grid, Toolbar, Typography } from '@mui/material';
import Navigation from './navigation';
import { useState } from 'react';
import User from '../models/User';

interface HeaderProps {
    user: User | undefined;
    handleLogout?: () => void;
  }

  
const Header: React.FC<HeaderProps> = ({ user, handleLogout }) => {

    return (
        <>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs>
                        <Typography>LOGO</Typography>
                    </Grid>
                </Grid>
            </Container>
            <AppBar position="static">
                <Container maxWidth="lg">
                    <Toolbar sx={{ flexWrap: 'wrap' }}>
                        <Navigation user={user} />
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )}

export default Header
