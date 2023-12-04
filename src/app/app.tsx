import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Main from './main';
import { myTheme } from './theme/my-theme';
import { StoreProvider } from './store/StoreProvider';


const App = () => {
  return (
    <div className='App'>
      <StoreProvider>
        <ThemeProvider theme={myTheme}>
          <CssBaseline />
          <Main />
        </ThemeProvider>
      </StoreProvider>
    </div>
  );
};

export default App;
