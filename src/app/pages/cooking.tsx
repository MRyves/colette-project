import React, { useEffect } from 'react';
import useBlogs from '../hooks/useBlogs';
import BlogSection from '../components/blogsection';
import { Grid, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { MainContainer, MainImage } from '../theme/my-theme';
import { Container } from '@mui/system';

const Cooking = () => {
  const { blogs, queryBlogs, deleteBlog, loading, error } = useBlogs();
  const user = useSelector((state: RootState) => state.auth.currentUser);

  useEffect(() => {
    queryBlogs({ category: 'Kochen' });
  }, []);

  return (
    <>
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
              <Typography>Tags...</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Irgend ein Inhalt...</Typography>
            </Grid>
          </Grid>
        </Grid>
      </MainContainer>
      <MainImage>
        <img
          src="assets/cooking.jpg"
          alt="Kochen"
          style={{ maxWidth: '100%' }}
        />
      </MainImage>
    </>
  );
};

export default Cooking;
