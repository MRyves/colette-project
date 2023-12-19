import React, { useEffect, useMemo } from 'react';
import BlogSection from '../components/blogsection';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import useBlogs from '../hooks/useBlogs';
import { MainContainer } from '../theme/my-theme';
import Blog from '../models/Blog';
import { Stack } from '@mui/system';
import Tags from '../components/layout/tags';
import LatestBlog from '../components/latestblog';

const Home = () => {
  const user = useSelector((state: RootState) => state.auth.currentUser);

  const { blogs, queryBlogs, deleteBlog, loading, error } = useBlogs();
  const filteredBlogs = useMemo(() => blogs.filter((blog) => blog.tags.includes('Guezli')), [blogs] );
  const latestBlog = useMemo(() => (blogs.length > 0 ? blogs[0] : null), [blogs]);

  
  useEffect(() => {
    queryBlogs();
  }, []);

  const handleDelete = async (uid: string) => {
    console.log('deleting id:', uid);
    await deleteBlog(uid);
  };

  return (
    <MainContainer maxWidth="lg">
      <Stack sx={{ m: '0 0 40px 0' }}>
        <Typography variant="h1">Welcome, foodlover!</Typography>
        <Typography variant='body1'>
          Begleite uns in unserer Küche, während wir die Aromen der Welt
          entdecken und lernen, wie man aus einfachen Zutaten magische Gerichte
          zaubert. Wir glauben daran, dass gutes Essen Menschen zusammenbringt
          und Erinnerungen schafft. Also schnapp dir deine Schürze, heize den
          Ofen vor und lass uns gemeinsam die Freude am Kochen und Backen
          feiern! Willkommen in unserer kulinarischen Welt, in der Geschmack,
          Kreativität und Genuss an erster Stelle stehen.
        </Typography>
        <Typography variant='body1'>Es gibt kaum etwas Besseres, als gemeinsam mit Freunden und Familie in der Küche zu stehen, Rezepte auszuprobieren und dabei über das Leben zu plaudern. Unsere Schürzen sind unsere Rüstungen, und der Herd ist unser Schlachtfeld, auf dem wir mit Aromen jonglieren und Zutaten tanzen lassen, um Geschmacksexplosionen zu erzeugen.</Typography>
      </Stack>
      <Grid container columnSpacing={{ md: 4, lg: 6 }}>
        <Grid item xs={12} md={7} lg={8} sx={{ paddingBottom: '30px' }}>
          <Grid container columnSpacing={4}>
            <Grid item sx={{mb: '30px'}}>
              <LatestBlog
                  blogs={blogs}
                  user={user}
                  handleDelete={handleDelete}
                />
              </Grid>
            <Grid item>
              <BlogSection
                blogs={blogs.slice(1)}
                user={user}
                handleDelete={handleDelete}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          {latestBlog ? <Typography variant="h2">Weihnachtsguezli</Typography> : ''}
          {filteredBlogs.map((blog: Blog) => (
            <div key={blog.uid}>
              <Tags blog={blog} ratingValue={0} />
            </div>
          ))}
        </Grid>
      </Grid>
    </MainContainer>
  );
};

export default Home;
