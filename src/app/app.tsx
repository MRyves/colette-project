import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Main from './main';
import { StoreProvider } from './store/StoreProvider';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { myTheme } from './theme/my-theme';
import { darkTheme } from './theme/dark-theme';


const App = () => {
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  return (
    <div className='App'>
      <StoreProvider>
        <ThemeProvider theme={darkMode ? darkTheme : myTheme}>
          <CssBaseline />
          <Main />
        </ThemeProvider>
      </StoreProvider>
    </div>
  );
};

export default App;
