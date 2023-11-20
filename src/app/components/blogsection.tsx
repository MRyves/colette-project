import { Button, CardMedia, Grid, Rating, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import User from '../models/User';
import DialogDelete from './dialog-delete';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';


interface BlogSectionProps {
  blogs: any[];
  user?: User;
  handleDelete: (uid: string) => void;
}


const BlogSection: React.FC<BlogSectionProps> = ({ blogs, user, handleDelete }) => {

  const userId = user?.uid;
  const [ratingValue, setRatingValue] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingUid, setDeletingUid] = useState<string>('');


  const handleDeleteBlog = () => {
    handleDelete(deletingUid);
    setDeleteDialogOpen(false);
    setDeletingUid('');
  };


  const handleClickOpen = (uid: string) => {
    setDeletingUid(uid);
    setDeleteDialogOpen(true);
  };


  return (
    <div>
      <Grid container spacing={4}>
        {blogs?.map((item) => (
          <Grid item xs={12} sm={12} md={6} key={item.uid}>
            <Link to={`/detail/${item.uid}`}>
              <CardMedia component='img' image={item.imgUrl} title={item.title} />
            </Link>
            <Stack></Stack>
            <Rating
              size='small'
              name='simple-controlled'
              value={ratingValue}
              // onChange={handleChange}
            />
            <Grid container spacing={2} justifyContent={'space-between'}>
              <Grid item>
                <Typography variant='h3'>
                  <Link to={`/detail/${item.uid}`}>{item.title}</Link>
                </Typography>
              </Grid>
              <Grid item>
                <Stack direction='row' alignItems='top' gap={1}>
                  <AccessAlarmIcon color='primary' />
                  <Typography>{item?.duration} Min.</Typography>
                </Stack>
              </Grid>
            </Grid>
            <Typography>{item.lead}</Typography>
            <Grid container>
              <Grid item xs={6}>
                <Link to={`/detail/${item.uid}`}>
                  <Button color='secondary' variant='outlined' disableElevation>Zum Rezept</Button>
                </Link>
              </Grid>
              {userId ? (
                <Grid item xs={6} textAlign={'right'}>
                  <DeleteOutlinedIcon onClick={() => handleClickOpen(item.uid)}></DeleteOutlinedIcon>
                </Grid>
              ) : ''}
            </Grid>
          </Grid>
        ))}
        <DialogDelete isOpen={deleteDialogOpen} handleClose={() => setDeleteDialogOpen(false)}
                      handleDelete={handleDeleteBlog} />
      </Grid>
    </div>
  );
};

export default BlogSection;
