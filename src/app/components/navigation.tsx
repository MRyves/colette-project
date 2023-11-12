import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { User, signOut } from 'firebase/auth';
import { auth } from '../firebase-config';

interface NavigationProps {
  user: User | null;
  handleLogout?: () => void;
  setActive?: (active: string) => void;
}

const pages = [
  { label: 'Home', to: '/' },
  { label: 'Cooking', to: '/cooking' },
  { label: 'Baking', to: '/baking' },
  { label: 'Create', to: '/create' },
  { label: 'Login', to: '/login' },
];
const settings = ['Profile', 'Logout'];

const Navigation: React.FC<NavigationProps> = ({ user, handleLogout, setActive }) => {
  const userId = user?.uid;
  console.log("userID", userId);
  console.log("name", user?.displayName);

  const onLogoutClick = async () => {
    try {
      await signOut(auth); // Benutzer ausloggen
      if (handleLogout) {
        handleLogout();
      }
    } catch (error) {
      console.error("Fehler beim Ausloggen:", error);
    }
  };

  const handleSetActive = () => {
    if (setActive) {
      setActive("home"); 
    }
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          {pages.map((page, index) => (
            <MenuItem key={index} onClick={handleCloseNavMenu}>
              <Link to={page.to}>
                <Typography textAlign="center">{page.label}</Typography>
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {pages.map((page, index) => (
          <Button
            key={index}
            component={Link}
            to={page.to}
            sx={{ my: 2, color: 'black', display: 'block' }}
          >
            {page.label}
          </Button>
        ))}
      </Box>
      {userId ? (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      ) : <div>?????</div>}
    </>
  );
};

export default Navigation;
