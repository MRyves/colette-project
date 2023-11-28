import React, { useEffect } from 'react';
import useBlogs from '../hooks/useBlogs';
import BlogSection from '../components/blogsection';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { MainContainer, MainImage } from '../theme/my-theme';


const Baking = () => {
  const { blogs, queryBlogs, deleteBlog } = useBlogs();
  const user = useSelector((state: RootState) => state.auth.currentUser);

  useEffect(() => {
    queryBlogs({ category: 'Backen' });
  }, []);

  return (
    <>
      <MainContainer maxWidth='lg'>
        <Grid container direction={'row-reverse'} spacing={{ sm: 4, md: 6 }}>
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
                <BlogSection blogs={blogs} user={user} handleDelete={deleteBlog} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MainContainer>
      <MainImage>
        <img src="assets/baking.jpg" alt="Backen" style={{ maxWidth: '100%' }} />
      </MainImage>
    </>
  );
};

export default Baking;
