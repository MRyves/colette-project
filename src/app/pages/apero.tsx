import React, { useEffect } from 'react';
import useBlogs from '../hooks/useBlogs';
import BlogSection from '../components/blogsection';
import { Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { MainContainer } from '../theme/my-theme';
import BlankSlate from '../components/blankslate/blankslate-blog';

const Apero = () => {
  const { blogs, queryBlogs, deleteBlog, loading, error } = useBlogs();
  const user = useSelector((state: RootState) => state.auth.currentUser);

  useEffect(() => {
    queryBlogs({ category: 'Apéro' });
  }, []);

  return (
    <MainContainer maxWidth='lg'>
        <Stack sx={{ m: '0 0 40px 0' }}>
          <Typography variant="h1">Apéro</Typography>
          <Typography variant='body1'>Der Apéro ist mehr als nur ein kulinarisches Ereignis; er ist ein soziales Ritual, das die Menschen zusammenbringt. Es ist eine Zeit zum Entspannen, Plaudern und Genießen. In der heutigen schnelllebigen Welt bietet der Apéro eine wunderbare Gelegenheit, innezuhalten und die kleinen Freuden des Lebens zu schätzen.</Typography>
        </Stack>
        {blogs.length > 0 ? (
          <BlogSection
            blogs={blogs}
            user={user}
            handleDelete={deleteBlog}
          />
          ) : (
            <BlankSlate />
          )}
      </MainContainer>
  );
};

export default Apero;
