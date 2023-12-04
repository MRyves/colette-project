import React from 'react';
import { CardMedia, Grid, Rating, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Blog from '../../models/Blog';
import { Box } from '@mui/system';

interface TagsProps {
    blog: Blog;
    ratingValue: number | null;
  }

const Tags: React.FC<TagsProps> = ({ blog, ratingValue }) => {

    const linkStyles = {
        textDecoration: 'none',
        color: '#000000',
      };
    

  return (
    <div key={blog.uid}>
      <Grid container alignItems={'center'} sx={{ borderBottom: '1px solid #d5d4d4', p: '13px 0px' }} justifyContent={'space-between'}>
        <Grid item xs={3}>
          <Link to={`/detail/${blog.uid}`}>
            <CardMedia
              style={{ marginBottom: '0px' }}
              component='img'
              image={blog.imgUrl}
              title={blog.title}
            />
          </Link>
        </Grid>
        <Grid item xs={8.3} alignItems={'center'}>
            <Link to={`/detail/${blog.uid}`} style={linkStyles}>
                <Typography sx={{marginBottom: '3px', fontWeight: 700}}>{blog.title}</Typography>
                <Rating sx={{marginBottom: '3px', padding: 0}} size="small" name="simple-controlled" value={ratingValue} />
            </Link>
        </Grid>
      </Grid>
    </div>
    );
};

export default Tags;
