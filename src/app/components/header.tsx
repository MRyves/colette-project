import React from 'react'
import { AppBar, Container, Grid, Toolbar, Typography } from '@mui/material';
import Navigation from './navigation';
import User from '../models/User';
import LoginNav from './loginnav';
import { Link } from 'react-router-dom';

interface HeaderProps {
    user: User | undefined;
    handleLogout?: () => void;
  }

  
const Header: React.FC<HeaderProps> = ({ user, handleLogout }) => {

    return (
        <>
            <AppBar position="static" elevation={0}>
                <Container maxWidth="lg">
                    <Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                        <LoginNav user={user} />
                    </Toolbar>
                </Container>
            </AppBar>
            <Container maxWidth="lg">
                <Grid container spacing={2} justifyContent={'space-between'}>
                    <Grid item>
                        <Link to={'/'}>
                            <Typography>LOGO</Typography>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Navigation user={user} />
                    </Grid>
                </Grid>
            </Container>
        </>
    )}

export default Header
