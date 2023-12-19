import React, { useEffect, useMemo } from 'react';
import useBlogs from '../hooks/useBlogs';
import BlogSection from '../components/blogsection';
import { Grid, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { MainContainer, MainImage } from '../theme/my-theme';
import Blog from '../models/Blog';
import Tags from '../components/layout/tags';
import BlankSlate from '../components/blankslate/blankslate-blog';

const Apero = () => {
  const { blogs, queryBlogs, deleteBlog, loading, error } = useBlogs();
  const user = useSelector((state: RootState) => state.auth.currentUser);
  const filteredBlogs = useMemo(() => blogs.filter(blog => blog.tags.includes('Apéro')), [blogs]);

  useEffect(() => {
    queryBlogs({ category: 'Apéro' });
  }, []);

  return (
    <MainContainer maxWidth='lg'>
        <Stack sx={{ m: '0 0 40px 0' }}>
          <Typography variant="h1">Apéro</Typography>
          <Typography variant='body1'>Der Apéro ist mehr als nur ein kulinarisches Ereignis; er ist ein soziales Ritual, das die Menschen zusammenbringt. Es ist eine Zeit zum Entspannen, Plaudern und Genießen. In der heutigen schnelllebigen Welt bietet der Apéro eine wunderbare Gelegenheit, innezuhalten und die kleinen Freuden des Lebens zu schätzen.


          </Typography>
        </Stack>
        <Grid container spacing={{ md: 4, lg: 6 }}>
          <Grid item xs={12} md={7} lg={8}>
            <Grid container spacing={4}>
            <Grid item>
              {blogs.length > 0 ? (
                <BlogSection
                  blogs={blogs}
                  user={user}
                  handleDelete={deleteBlog}
                />
                ) : (
                  <BlankSlate />
                )}
                </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
          <Grid item>
            {blogs.length > 0 ? (
              <Typography variant='h2'>Fingerfood & Snacks</Typography>
              ) : (
                ''
              )}
              {filteredBlogs.map((blog: Blog) => (
                <div key={blog.uid}>
                  <Tags blog={blog} ratingValue={0} />
                </div>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </MainContainer>
  );
};

export default Apero;
