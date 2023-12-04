import Header from './components/layout/header';
import AppRoutes from './routes/routes';
import Footer from './components/layout/footer';
import { Fab } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { Link, useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const Main = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const location = useLocation();
  const userId = currentUser?.uid;

  return (<>
    <Header user={currentUser} />
    <main>
        <AppRoutes />
        {userId && location.pathname !== '/create' ? (
          <Link to="/create">
            <Fab color="secondary" aria-label="add" style={{ boxShadow: 'none' }}>
              <AddIcon  />
            </Fab>
          </Link>
          ) : ""}
      </main>
    <Footer />
  </>);
};

export default Main;
