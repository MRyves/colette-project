import React, { useEffect, useMemo } from 'react';
import useBlogs from '../hooks/useBlogs';
import BlogSection from '../components/blogsection';
import { Grid, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { MainContainer } from '../theme/my-theme';
import Tags from '../components/layout/tags';
import Blog from '../models/Blog';
import BlankSlate from '../components/blankslate/blankslate-blog';

const MainCourse = () => {
  const { blogs, queryBlogs, deleteBlog, loading, error } = useBlogs();
  const user = useSelector((state: RootState) => state.auth.currentUser);


  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => blog.tags.includes('Vegetarisch') && blog.category === 'Hauptgang');
  }, [blogs]);



  useEffect(() => {
    queryBlogs({ category: 'Hauptgang' });
  }, []);




  return (
    <MainContainer maxWidth='lg'>
        <Stack sx={{ m: '0 0 40px 0' }}>
          <Typography variant="h1">Hauptgang</Typography>
          <Typography>Das Backen ist nicht nur eine kulinarische Kunst, sondern auch eine herzliche Umarmung für die Sinne. Es ist eine Zeitreise in die Wärme und Geborgenheit unserer Kindheit, als der verlockende Duft von frisch gebackenem Brot oder köstlichen Kuchen die Küche erfüllte und uns ein Lächeln ins Gesicht zauberte.</Typography>
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
              <Typography variant='h2'>Vegetarisch</Typography>
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

export default MainCourse;
