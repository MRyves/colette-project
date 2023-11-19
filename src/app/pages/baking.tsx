import React, { useEffect } from 'react';
import useBlogs from '../hooks/useBlogs';
import BlogSection from '../components/blogsection';
import User from '../models/User';
import { CardMedia, Grid, Typography } from '@mui/material';

interface BakingProps {
  user?: User;
}

const Baking: React.FC<BakingProps> = ({ user }) => {
  const { blogs, queryBlogs, deleteBlog, loading, error } = useBlogs();

  useEffect(() => {
    queryBlogs();
  }, []);

  const bakingBlogs = blogs.filter((blog) => blog.category === 'Backen');

  return (
    <Grid container direction={'row-reverse'} spacing={{ sm: 4, md: 8 }}>
      <Grid item xs={12} sm={6} md={4}>
        <Grid item>
          <Typography>Tags...</Typography>
          </Grid>
          <Grid item>
            <Typography variant='caption'>«Namnis di consed mi, ut ommoluptam, que nobis int, omnia dolupta quibus»</Typography>
          </Grid>
        </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <Grid container spacing={4}>
          <Grid item>
            <Typography variant='h1'> Backen</Typography>
            <Typography>Das Backen ist nicht nur eine kulinarische Kunst, sondern auch eine herzliche Umarmung für die Sinne. Es ist eine Zeitreise in die Wärme und Geborgenheit unserer Kindheit, als der verlockende Duft von frisch gebackenem Brot oder köstlichen Kuchen die Küche erfüllte und uns ein Lächeln ins Gesicht zauberte.</Typography>
          </Grid>
          <Grid item>
            <BlogSection blogs={bakingBlogs} user={user} handleDelete={deleteBlog} />
          </Grid>
        </Grid>
      </Grid>
      <img src="/images/baking.jpg" alt="Beschreibung des Bildes" />
    </Grid>
  );
};

export default Baking;
