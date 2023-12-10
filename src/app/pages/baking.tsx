import React, { useEffect, useMemo } from 'react';
import useBlogs from '../hooks/useBlogs';
import BlogSection from '../components/blogsection';
import { Grid, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { MainContainer } from '../theme/my-theme';
import { Container } from '@mui/system';
import Tags from '../components/layout/tags';
import Blog from '../models/Blog';

const Baking = () => {
  const { blogs, queryBlogs, deleteBlog, loading, error } = useBlogs();
  const user = useSelector((state: RootState) => state.auth.currentUser);
  const filteredBlogs = useMemo(() => blogs.filter(blog => blog.tags.includes('Süss')), [blogs]);

  useEffect(() => {
    queryBlogs({ category: 'Backen' });
  }, []);

  return (
    <MainContainer maxWidth='lg'>
        <Stack sx={{ m: '0 0 40px 0' }}>
          <Typography variant="h1">Backen</Typography>
          <Typography>Das Backen ist nicht nur eine kulinarische Kunst, sondern auch eine herzliche Umarmung für die Sinne. Es ist eine Zeitreise in die Wärme und Geborgenheit unserer Kindheit, als der verlockende Duft von frisch gebackenem Brot oder köstlichen Kuchen die Küche erfüllte und uns ein Lächeln ins Gesicht zauberte.</Typography>
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
              <Typography variant='h2'>Süss</Typography>
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

export default Baking;
