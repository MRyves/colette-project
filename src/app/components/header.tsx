import React from 'react'
import {User} from 'firebase/auth';
import { AppBar, Container, Grid, Toolbar, Typography } from '@mui/material';
import Navigation from './navigation';
import { useState } from 'react';
import { Link } from 'react-router-dom';



interface HeaderProps {
    user: User | null;
    handleLogout?: () => void;
  }

  
const Header: React.FC<HeaderProps> = ({ user, handleLogout }) => {
    const [active, setActive] = useState("home");

    return (
        <>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs>
                        <Typography>LOGO</Typography>
                    </Grid>
                    <Grid item xs>
                        <Link to={'/profile'}>Profile</Link>
                    </Grid>
                </Grid>
            </Container>
            <AppBar position="static">
                <Container maxWidth="lg">
                    <Toolbar sx={{ flexWrap: 'wrap' }}>
                        <Navigation user={user} setActive={setActive} />
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )}

export default Header
