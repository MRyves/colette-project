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

const Dessert = () => {
  const { blogs, queryBlogs, deleteBlog, loading, error } = useBlogs();
  const user = useSelector((state: RootState) => state.auth.currentUser);
  const filteredBlogs = useMemo(() => blogs.filter(blog => blog.tags.includes('Torten & Kuchen')), [blogs]);

  useEffect(() => {
    queryBlogs({ category: 'Dessert' });
  }, []);

  return (
    <MainContainer maxWidth='lg'>
        <Stack sx={{ m: '0 0 40px 0' }}>
          <Typography variant="h1">Dessert</Typography>
          <Typography>Desserts sind das süße Finale eines jeden Mahls und eine wahre Freude für die Sinne. Sie bieten eine verlockende Möglichkeit, den Geschmackssinn zu verwöhnen und den Genuss einer Mahlzeit zu krönen. Egal, ob Sie ein einfaches Eis genießen oder ein aufwendiges, kunstvoll dekoriertes Dessert probieren, die Welt der Desserts bietet eine Fülle von Möglichkeiten, die für jeden Gaumen etwas bereithalten.</Typography>
        </Stack>
        <Grid container columnSpacing={{ md: 4, lg: 6 }}>
          <Grid item xs={12} md={7} lg={8}>
            <Grid container columnSpacing={4}>
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
              <Typography variant='h2'>Torten & Kuchen</Typography>
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

export default Dessert;
