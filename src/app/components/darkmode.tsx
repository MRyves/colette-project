import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { toggleDarkMode } from '../store/darkModeReducer';
import LightModeIcon from '@mui/icons-material/LightMode';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import { Colors, StyledDarkButton } from '../theme/my-theme';
import { IconButton } from '@mui/material';




function Darkmode() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  const handleDarkModeToggle = () => {
      dispatch(toggleDarkMode());
    };

  return (
  //   <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
  //   {theme.palette.mode === 'dark' ? <LightModeIcon /> : <Brightness3Icon />}
  // </IconButton>
<StyledDarkButton disableRipple onClick={handleDarkModeToggle}>
      {darkMode ? <LightModeIcon sx={{color: Colors.white}} /> : <Brightness3Icon sx={{color: Colors.white}} /> }
    </StyledDarkButton>
);
}

export default Darkmode;