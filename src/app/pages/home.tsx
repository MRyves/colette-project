import React, { useEffect, useMemo, useState } from 'react';
import BlogSection from '../components/blogsection';
import { CardMedia, Container, Grid, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Link } from 'react-router-dom';
import useBlogs from '../hooks/useBlogs';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import SearchBar from '../components/search';
import { MainContainer, ReadmoreButton } from '../theme/my-theme';


const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.currentUser);
  const { blogs, queryBlogs, deleteBlog, loading, error } = useBlogs();
  const [searchQuery, setSearchQuery] = useState('');
  const latestBlog = useMemo(() => (blogs.length > 0 ? blogs[0] : null), [blogs]);

  useEffect(() => {
    queryBlogs();
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleDelete = async (uid: string) => {
    console.log('deleting id:', uid);
    await deleteBlog(uid);
  };


  return (
    <MainContainer maxWidth='lg' sx={{p: '70px 0'}}>
      <Grid container direction="row-reverse" spacing={{ sm: 4, md: 6 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='h1'>Welcome, foodlover!</Typography>
          <Typography>
            Begleite uns in unserer Küche, während wir die Aromen der Welt
            entdecken und lernen, wie man aus einfachen Zutaten magische
            Gerichte zaubert. Wir glauben daran, dass gutes Essen Menschen
            zusammenbringt und Erinnerungen schafft. Also schnapp dir deine
            Schürze, heize den Ofen vor und lass uns gemeinsam die Freude am
            Kochen und Backen feiern! Willkommen in unserer kulinarischen Welt,
            in der Geschmack, Kreativität und Genuss an erster Stelle stehen.
          </Typography>
          <SearchBar onSearch={handleSearch} />
          <Typography variant='h3'>Tags</Typography>
          <Typography variant='body1'>Coming soon...</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Grid container spacing={4}>
            <Grid item>
              {latestBlog && (
                <>
                  <Link to={`/detail/${latestBlog.uid}`}>
                    <CardMedia
                      component='img'
                      image={latestBlog.imgUrl}
                      title={latestBlog.title}
                      sx={{paddingTop: '7px'}}
                    />
                  </Link>
                  <Typography variant='h3'>
                    <Link to={`/detail/${latestBlog.uid}`}>
                      {latestBlog.title}
                    </Link>
                  </Typography>
                  <Typography>{latestBlog.lead}</Typography>
                  <Link to={`/detail/${latestBlog.uid}`}>
                    <ReadmoreButton variant='outlined' disableElevation>
                      Zum Rezept
                    </ReadmoreButton>
                  </Link>
                </>
              )}
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
      </Grid>
    </MainContainer>
  );
};

export default Home;
