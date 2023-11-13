import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import Create from '../pages/create';
import Baking from '../pages/baking';
import Cooking from '../pages/cooking';
import Detail from '../pages/detail';
import Edit from '../pages/edit';
import SignIn from '../pages/login';
import { PrivateRoutes } from '../components/private-routes';
import Profile from '../pages/profile';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { auth } from '../firebase-config';
import { logout, setUser } from '../store/auth/auth-slice';
import User from '../models/User';

const AppRoutes = () => {
  const dispatch = useDispatch<AppDispatch>();

  auth.onAuthStateChanged(user => {
    if (user) {
      dispatch(setUser({ uid: user.uid, email: user.email, displayName: user.displayName } as User));
    } else {
      dispatch(logout());
    }
  });

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/profile' element={<Profile user={null} />} />
      <Route element={<PrivateRoutes />}>
        <Route path='/create' element={<Create />} />
        <Route path='/edit/:id' element={<Edit />} />
      </Route>
      <Route path='/Baking' element={<Baking blogs={[]} handleDelete={function(id: any): void {
        throw new Error('Function not implemented.');
      }} />} /> {/* Verwende 'element' statt 'Component' */}
      <Route path='/Cooking' element={<Cooking />} /> {/* Verwende 'element' statt 'Component' */}
      <Route path='/detail/:blogId' element={<Detail />} />
      {/* What is wrong?? <Route path="/detail/:userId" element={<Detail />} /> */}
      <Route path='/login' element={<SignIn />} />
    </Routes>
  );
};

export default AppRoutes;
