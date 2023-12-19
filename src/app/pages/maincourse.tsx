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
          <Typography>Der Hauptgang ist das Herzstück einer Mahlzeit und oft das, was den kulinarischen Höhepunkt eines Essens ausmacht. Es ist der Teil des Menüs, auf den die meisten Menschen am meisten gespannt sind, und er bietet die Möglichkeit, mit einer breiten Palette von Zutaten, Zubereitungsarten und Geschmacksrichtungen zu experimentieren.</Typography>
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
