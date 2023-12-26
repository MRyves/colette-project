import React, { useMemo } from 'react';
import { Card, CardContent, CardMedia, Grid, Rating, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Colors, ReadmoreButton } from '../theme/my-theme';
import BlankSlate from './blankslate/blankslate-blog';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import Blog from '../models/Blog';
import User from '../models/User';


interface LatestBlogProps {
  blogs: Blog[];
  user?: User;
  handleDelete: (uid: string) => void;
}

const LatestBlog: React.FC<LatestBlogProps> = ({ blogs, user, handleDelete }) => {

  const latestBlog = useMemo(() => (blogs.length > 0 ? blogs[0] : null), [blogs]);


  return (
    latestBlog ? (
      <Card elevation={0}>
        <Link to={`/detail/${latestBlog.uid}`}>
          <CardMedia
            component='img'
            image={latestBlog.imgUrl}
            title={latestBlog.title}
            alt={"Bild von " + latestBlog.title}
            />
        </Link>
        <CardContent>
          <Typography variant='h2'>
            <Link to={`/detail/${latestBlog.uid}`}>
              {latestBlog.title}
            </Link>
          </Typography>
          {latestBlog.avgRating ?
            <Rating readOnly size='small' name='simple-controlled' value={latestBlog.avgRating} /> : ''}
          <Grid sx={{ mb: '25px' }} item>
            <Typography>{latestBlog.lead}</Typography>
          </Grid>
          <Grid container alignItems={'center'}>
            <Grid item xs={10}>
              <Link to={`/detail/${latestBlog.uid}`}>
                <ReadmoreButton variant='outlined' disableElevation>
                  Zum Rezept
                </ReadmoreButton>
              </Link>
            </Grid>
            {user?.uid === latestBlog.userId ? (
              <Grid item xs={2}>
                <Grid container alignItems={'center'} justifyContent={'flex-end'} spacing={1}>
                  <Grid item>
                    <Link aria-label="Rezept bearbeiten" to={`/edit/${latestBlog.uid}`}>
                      <EditIcon sx={{ color: Colors.secondary.main }} />
                    </Link>
                  </Grid>
                  <Grid item>
                    <DeleteOutlinedIcon aria-label="Rezept löschen" sx={{ color: Colors.secondary.main }}
                                        onClick={() => handleDelete(latestBlog.uid)} />
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              ''
            )}
          </Grid>
        </CardContent>
      </Card>
    ) : (
      <BlankSlate />
    )
  );
};

export default LatestBlog;
