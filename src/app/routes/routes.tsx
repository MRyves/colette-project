import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import Create from '../pages/create';
import Detail from '../pages/detail';
import Edit from '../pages/edit';
import SignIn from '../pages/login';
import { PrivateRoutes } from '../components/private-routes';
import Profile from '../pages/profile';
import Imprint from '../pages/imprint';
import ForgotPassword from '../pages/forgot';
import Dessert from '../pages/dessert';
import MainCourse from '../pages/maincourse';
import Apero from '../pages/apero';
import TagsPage from '../pages/tags-page';
import Appetizer from '../pages/appetizer';
import Baking from '../pages/baking';

const AppRoutes = () => {


  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route element={<PrivateRoutes />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/create' element={<Create />} />
        <Route path='/edit/:blogId' element={<Edit />} />
      </Route>
      <Route path='/apero' element={<Apero />} />
      <Route path='/tags/:tag' element={<TagsPage />} />
      <Route path='/vorspeise' element={<Appetizer />} />
      <Route path='/hauptgang' element={<MainCourse />} />
      <Route path='/dessert' element={<Dessert />} />
      <Route path='/backen' element={<Baking />} />
      <Route path='/detail/:blogId' element={<Detail />} />
      <Route path='/login' element={<SignIn />} />
      <Route path='/imprint' element={<Imprint />} />
      <Route path='/forgot' element={<ForgotPassword />} />
    </Routes>
  );
};

export default AppRoutes;
