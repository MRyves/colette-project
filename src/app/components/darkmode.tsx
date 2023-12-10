import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { toggleDarkMode } from '../store/darkModeReducer';
import LightModeIcon from '@mui/icons-material/LightMode';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import { StyledDarkButton, myTheme } from '../theme/my-theme';




function Darkmode() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  const handleDarkModeToggle = () => {
      dispatch(toggleDarkMode());
    };

  return (
    <StyledDarkButton disableRipple onClick={handleDarkModeToggle}>
      {darkMode ? <LightModeIcon sx={{color: myTheme.palette.primary.light}} /> : <Brightness3Icon sx={{color: myTheme.palette.primary.light}} /> }
    </StyledDarkButton>
);
}

export default Darkmode;