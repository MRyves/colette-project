import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import Container from '@mui/material/Container';
import Header from './components/header';
import AppRoutes from './routes/routes';
import myTheme from './theme/my-theme';
import Footer from './components/footer';
import { StoreProvider } from './store/StoreProvider';
import { useDispatch } from 'react-redux';
import { auth } from './firebase-config';
import { AppDispatch } from './store/store';
import { logout, setUser } from './store/auth/auth-slice';
import User from './models/User';


const App = () => {

  return (
    <div className='App'>
      <StoreProvider>
        <ThemeProvider theme={myTheme}>
          <CssBaseline />
          <Header user={null} />
          <Box
            sx={{
              pt: 8,
              pb: 8
            }}
          >
            <Container maxWidth='lg'>
              <AppRoutes />
            </Container>
          </Box>
          <Footer />
        </ThemeProvider>
      </StoreProvider>
    </div>
  );
};

export default App;
