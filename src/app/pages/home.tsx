import React, { useEffect, useMemo, useState } from 'react';
import BlogSection from '../components/blogsection';
import { Card, CardContent, CardMedia, Grid, Rating, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Link } from 'react-router-dom';
import useBlogs from '../hooks/useBlogs';
import SearchBar from '../components/search/search';
import { MainContainer, ReadmoreButton, myTheme } from '../theme/my-theme';
import Blog from '../models/Blog';
import { Stack } from '@mui/system';
import Tags from '../components/layout/tags';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';




const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.currentUser);
  const { blogs, queryBlogs, deleteBlog, loading, error } = useBlogs();
  const [searchQuery, setSearchQuery] = useState('');
  const latestBlog = useMemo(() => (blogs.length > 0 ? blogs[0] : null), [blogs]);
  const [ratingValue, setRatingValue] = useState<number | null>(null);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    queryBlogs();
  }, [searchQuery]);



  useEffect(() => {
    if (searchQuery === 'Weihnachten') {
      const filteredBlogs = blogs.filter((blog) =>
        blog.tags.includes('Weihnachten')
      );
      setFilteredBlogs(filteredBlogs);
    } else {
      setFilteredBlogs(blogs);
    }
  }, [searchQuery, blogs]);




  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleDelete = async (uid: string) => {
    console.log('deleting id:', uid);
    await deleteBlog(uid);
  };

  return (
    <MainContainer maxWidth='lg'>
      <Stack sx={{ m: '0 0 40px 0' }}>
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
      </Stack>
      <Grid container spacing={{ sm: 4, md: 6 }}>
        <Grid item xs={12} sm={7} md={8} sx={{paddingBottom: '30px'}}>
          <Grid container spacing={4}>
            <Grid item>
              {latestBlog && (
                <Card elevation={0}>
                  <Link to={`/detail/${latestBlog.uid}`}>
                    <CardMedia
                      component='img'
                      image={latestBlog.imgUrl}
                      title={latestBlog.title}
                    />
                  </Link>
                  <CardContent>
                    <Typography variant='h3'>
                      <Link to={`/detail/${latestBlog.uid}`}>
                        {latestBlog.title}
                      </Link>
                    </Typography>
                    <Rating size="small" name="simple-controlled" value={ratingValue} />
                    <Grid sx={{mb: '25px'}} item>
                      <Typography>{latestBlog.lead}</Typography>
                    </Grid>
                    <Grid container alignItems={'center'}>
                      <Grid item xs={10}>
                        <Link to={`/detail/${latestBlog.uid}`}>
                          <ReadmoreButton variant="outlined" disableElevation>
                            Zum Rezept
                          </ReadmoreButton>
                        </Link>
                      </Grid>
                      {user?.uid ? (
                        <Grid item xs={2}>
                          <Grid container alignItems={'center'} justifyContent={'flex-end'} spacing={1}>
                            <Grid item>
                                <Link to={`/edit/${latestBlog.uid}`}>
                                  <EditIcon sx={{color: myTheme.palette.secondary.main}} />
                                </Link>
                              </Grid>
                              <Grid item>
                                <DeleteOutlinedIcon sx={{color: myTheme.palette.secondary.main}} />
                                {/* <DeleteOutlinedIcon
                                  sx={{color: myTheme.palette.secondary.main}}
                                  onClick={() => handleClickOpen(latestBlog.uid)}
                                ></DeleteOutlinedIcon> */}
                              </Grid>
                            </Grid>
                        </Grid>
                      ) : (
                        ''
                      )}
                    </Grid>
                  </CardContent>
                </Card>
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
        <Grid item xs={12} sm={5} md={4}>
          <SearchBar onSearch={handleSearch} />
          <Typography variant='h3'>Weihnachten</Typography>
          {filteredBlogs.map((blog: Blog) => (
            <div key={blog.uid}>
              <Tags blog={blog} ratingValue={ratingValue} />
            </div>
          ))}
        </Grid>
      </Grid>
    </MainContainer>
  );
};

export default Home;
