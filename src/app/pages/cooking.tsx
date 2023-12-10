import React, { useEffect, useMemo } from 'react';
import useBlogs from '../hooks/useBlogs';
import BlogSection from '../components/blogsection';
import { Grid, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { MainContainer, MainImage } from '../theme/my-theme';
import { Container } from '@mui/system';
import Blog from '../models/Blog';
import Tags from '../components/layout/tags';

const Cooking = () => {
  const { blogs, queryBlogs, deleteBlog, loading, error } = useBlogs();
  const user = useSelector((state: RootState) => state.auth.currentUser);
  const filteredBlogs = useMemo(() => blogs.filter(blog => blog.tags.includes('Apéro')), [blogs]);

  useEffect(() => {
    queryBlogs({ category: 'Kochen' });
  }, []);

  return (
    <MainContainer maxWidth='lg'>
        <Stack sx={{ m: '0 0 40px 0' }}>
          <Typography variant="h1"> Kochen</Typography>
          <Typography>
            In der Küche treffen Kulturen und Traditionen aufeinander. Jede
            Region der Welt hat ihre eigenen einzigartigen Gerichte und
            Zubereitungstechniken, die von Generation zu Generation
            weitergegeben werden. Das Kochen ermöglicht uns, die Welt zu
            erkunden, indem wir verschiedene Küchen und kulinarische Traditionen
            kennenlernen und ausprobieren.
          </Typography>
        </Stack>
        <Grid container spacing={{ sm: 4, md: 6 }}>
          <Grid item xs={12} sm={7} md={8}>
            <Grid container spacing={4}>
              <Grid item>
                <BlogSection
                  blogs={blogs}
                  user={user}
                  handleDelete={deleteBlog}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={5} md={4}>
          <Grid item>
              <Typography variant='h2'>Fingerfood & Snacks</Typography>
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

export default Cooking;
