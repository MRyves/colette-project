import Container from '@mui/material/Container';
import Header from './components/header';
import AppRoutes from './routes/routes';
import Footer from './components/footer';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { auth } from './firebase-config';
import { logout, setUser } from './store/auth/auth-slice';
import User from './models/User';


const Main = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const dispatch = useDispatch<AppDispatch>();

  auth.onAuthStateChanged(user => {
    if (user && !currentUser) {
      dispatch(setUser({ uid: user.uid, email: user.email, displayName: user.displayName } as User));
    } else if (!user && !!currentUser) {
      dispatch(logout());
    }
  });

  return (<>
    <Header user={currentUser} />
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
  </>);
};

export default Main;
