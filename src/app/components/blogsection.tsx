import { Button, Card, CardContent, CardMedia, Grid, Rating, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import User from '../models/User';
import DialogDelete from './dialog-delete';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useState } from 'react';
import CookieIcon from '@mui/icons-material/Cookie';



interface BlogSectionProps {
  blogs: any[];
  user?: User;
  handleDelete: (id: any) => void;
}


const BlogSection: React.FC<BlogSectionProps> = ({ blogs, user, handleDelete }) => {

  const userId = user?.uid;
  const [value, setValue] = React.useState<number | null>(null);
  console.log({value});
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, newValue: number | null) => {
    setValue(newValue);
  };

  const handleDeleteBlog = (id: number) => {
    // TODO: delete logic
    console.log('Delete blog: ', id);
    setDeleteDialogOpen(false);
  };


  return (
    <div>
      <Grid container spacing={5}>
        {blogs?.map((item) => (
          <Grid item xs={12} sm={12} md={6} key={item.id}>
            <Card sx={{ borderRadius: 0, boxShadow: 2 }}>
              <Link to={`/detail/${item.id}`}>
                <CardMedia component='img' image={item.imgUrl} title={item.title} />
              </Link>
              <CardContent>
                <Stack></Stack>
                <Rating
                  size='small'
                  name='simple-controlled'
                  value={value}
                  // onChange={handleChange}
                  />
                <Typography variant='h3'>{item.title}</Typography>
                <Typography>{item.lead}</Typography>
                <Link to={`/detail/${item.id}`}>
                  <Button color='secondary' variant='outlined' disableElevation>Read more</Button>
                </Link>
                <DialogDelete isOpen={deleteDialogOpen} handleClose={() => setDeleteDialogOpen(false)}
                              handleDelete={() => handleDeleteBlog(item.id)} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BlogSection;
