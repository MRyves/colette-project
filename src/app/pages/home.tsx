import React, { useEffect } from 'react';
import BlogSection from '../components/blogsection';
import { Button, Card, CardContent, CardMedia, Grid, Stack, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Link } from 'react-router-dom';
import useBlogs from '../hooks/useBlogs';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import TuneIcon from '@mui/icons-material/Tune';

const Home = () => {
  const user = useSelector((state: RootState) => state.auth.currentUser);
  const { blogs, queryBlogs, deleteBlog, loading, error } = useBlogs();

  useEffect(() => {
    queryBlogs();
  }, []);

  const handleDelete = async (uid: string) => {
    console.log('deleting id:', uid);
    await deleteBlog(uid);
  };

  const latestBlog = blogs.length > 0 ? blogs[0] : null;

  return (
    <Grid container direction={'row-reverse'} spacing={{ sm: 4, md: 8 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='h1'>Welcome, foodlover!</Typography>
          <Typography>Lorem ipsum dolor sit et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lore ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam.</Typography>
          <Card>
            <CardContent component='div'>
              <TextField id='outlined-basic' label='Search' variant='outlined' />
            </CardContent>
          </Card>
          <Card>
            <CardContent component='div'>
              <Typography>Coming soon...</Typography>
            </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
          <Grid container spacing={4}>
            <Grid item>
              {latestBlog && (
                <>
                  <Link to={`/detail/${latestBlog.uid}`}>
                    <CardMedia component='img' image={latestBlog.imgUrl} title={latestBlog.title} />
                  </Link>

                  <Grid container spacing={2} justifyContent={'space-between'}>
                    <Grid item>
                      <Typography variant='h3'>
                        <Link to={`/detail/${latestBlog.uid}`}>{latestBlog.title}</Link>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Stack direction="row" alignItems="top" gap={1}>
                        <AccessAlarmIcon color='primary' />
                        <Typography>{latestBlog.duration} Min.</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Typography>{latestBlog.lead}</Typography>
                </>
              )}
            </Grid>
            <Grid item>
              <BlogSection blogs={blogs.slice(1)} user={user} handleDelete={handleDelete} />
            </Grid>
          </Grid>
        </Grid>
    </Grid>
  );
};

export default Home;
