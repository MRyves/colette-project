import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode';
import Brightness3Icon from '@mui/icons-material/Brightness3';

const ColorModeContext = React.createContext({ toggleColorMode: () => {
    //
} });

function Darkmode() {
  const darkTheme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
      <IconButton sx={{ mt: 2 }} onClick={colorMode.toggleColorMode} color="inherit">
        {darkTheme.palette.mode === 'dark' ? <LightModeIcon /> : <Brightness3Icon />}
      </IconButton>
    );
}

export default Darkmode;
