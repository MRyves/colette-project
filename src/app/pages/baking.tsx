import React, { useEffect, useMemo } from 'react';
import useBlogs from '../hooks/useBlogs';
import BlogSection from '../components/blogsection';
import { Grid, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { MainContainer } from '../theme/my-theme';
import Blog from '../models/Blog';
import Tags from '../components/layout/tags';
import BlankSlate from '../components/blankslate/blankslate-blog';

const Baking = () => {
  const { blogs, queryBlogs, deleteBlog, loading, error } = useBlogs();
  const user = useSelector((state: RootState) => state.auth.currentUser);
  const filteredBlogs = useMemo(() => blogs.filter(blog => blog.tags.includes('Guezli')), [blogs]);

  useEffect(() => {
    queryBlogs({ category: 'Backen' });
  }, []);

  return (
    <MainContainer maxWidth='lg'>
        <Stack sx={{ m: '0 0 40px 0' }}>
          <Typography variant="h1">Backen</Typography>
          <Typography variant='body1'>Das Backen ist eine der ältesten kulinarischen Traditionen der Menschheit und ein wunderbarer Weg, um köstliche Leckereien zu kreieren und Menschen zusammenzubringen. Es gibt kaum etwas Besseres als den verlockenden Duft von frisch gebackenem Brot, Kuchen oder Keksen, der sich im ganzen Haus ausbreitet und die Vorfreude auf das Genießen steigert.</Typography>
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
              <Typography variant='h2'>Guezli</Typography>
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

export default Baking;
