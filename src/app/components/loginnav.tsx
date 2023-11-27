import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import User from '../models/User';
import PersonIcon from '@mui/icons-material/Person';
import { Grid } from '@mui/material';

interface LoginNavProps {
  user: User | undefined;
  handleLogout?: () => void;
  setActive?: (active: string) => void;
}

const LoginNav: React.FC<LoginNavProps> = ({
  user,
  handleLogout,
  setActive,
}) => {
  const userId = user?.uid;
  console.log('userID', userId);
  console.log('name', user?.displayName);

  const onLogoutClick = async () => {
    console.log('on logout click');
    try {
      await signOut(auth);
      if (handleLogout) {
        handleLogout();
      }
    } catch (error) {
      console.error('Fehler beim Ausloggen:', error);
    }
  };

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Grid container>
      <Grid item>
        {userId ? (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <PersonIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Link to={'/profile'}>Profil</Link>
                <Link onClick={onLogoutClick} to={'/'}>
                  Logout
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button
            component={Link}
            sx={{ my: 2, color: 'black', display: 'block', m: '0px 0px 0px 10px', p: '15px 0px' }}
            to={'/login'}
          >
            Login
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default LoginNav;
