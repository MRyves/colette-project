import React, { useEffect } from 'react';
import BlogSection from '../components/blogsection';
import { Card, CardContent, CardMedia, Grid, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Link } from 'react-router-dom';
import useBlogs from '../hooks/useBlogs';

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


  console.log('blogs', blogs);

  return (
    <div>
      <Grid container spacing={8}>
        <Grid item xs={8}>
          {latestBlog && (
            <Card sx={{ borderRadius: 0, boxShadow: 2 }}>
              <Link to={`/detail/${latestBlog.uid}`}>
                <CardMedia component='img' image={latestBlog.imgUrl} title={latestBlog.title} />
              </Link>
              <CardContent>
                <Typography variant='h3'>{latestBlog.title}</Typography>
                <Typography>{latestBlog.lead}</Typography>
              </CardContent>
            </Card>
          )}
          <BlogSection blogs={blogs.slice(1, blogs.length - 1)} user={user} handleDelete={handleDelete} />
        </Grid>
        <Grid item xs={4}>
          <Typography variant='h1'>Welcome, foodlover!</Typography>
          <Typography>Lorem ipsum dolor sit et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
            ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam.</Typography>
          <TextField id='outlined-basic' label='Search' variant='outlined' />
          <Card>
            <CardContent component='div'>
              <Typography>Coming soon...</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>


    </div>
  );
};

export default Home;
