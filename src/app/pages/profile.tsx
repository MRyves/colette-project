import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { MainContainer } from '../theme/my-theme';
import BlogSection from '../components/blogsection';
import useBlogs from '../hooks/useBlogs';
import { useEffect, useMemo } from 'react';


const Profile = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const { blogs, queryBlogs } = useBlogs();
  const filteredBlogs = useMemo(() => blogs.filter(b => b.userId === currentUser!.uid), [blogs]);

  useEffect(() => {
    queryBlogs();
  }, []);


  return (
    <MainContainer maxWidth='lg'>
      <Typography variant='h1'>Hallo {currentUser?.displayName || 'Name'}</Typography>
      <p>Hier siehst du alle deine bis jetzt verfassten Rezepte:</p>

      <BlogSection blogs={filteredBlogs} handleDelete={() => {}} />
    </MainContainer>
  );
};

export default Profile;
