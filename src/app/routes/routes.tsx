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

const AppRoutes = () => {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/profile' element={<Profile />} />
      <Route element={<PrivateRoutes />}>
        <Route path='/create' element={<Create />} />
        <Route path='/edit/:blogId' element={<Edit />} />
      </Route>
      <Route path='/Baking' element={<Baking />} />
      <Route path='/Cooking' element={<Cooking />} />
      <Route path='/detail/:blogId' element={<Detail />} />
      <Route path='/login' element={<SignIn />} />
    </Routes>
  );
};

export default AppRoutes;
