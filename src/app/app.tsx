import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Main from './main';
import { myTheme } from './theme/my-theme';


const App = () => {
  return (
    <div className='App'>
      <ThemeProvider theme={myTheme}>
        <CssBaseline />
        <Main />
      </ThemeProvider>
    </div>
  );
};

export default App;
