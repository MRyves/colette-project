import { Button, CardMedia, Grid, Rating, Stack, Typography } from '@mui/material';
import React from 'react';
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
  const [value, setValue] = React.useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);


  const handleDeleteBlog = (uid: string) => {
    setDeleteDialogOpen(false);
    handleDelete(uid);
  };


  const handleClickOpen = () => {
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
              value={value}
              // onChange={handleChange}
            />
            <Grid container spacing={2} justifyContent={'space-between'}>
              <Grid item>
                <Typography variant='h3'>
                  <Link to={`/detail/${item.uid}`}>{item.title}</Link>
                </Typography>
              </Grid>
              <Grid item>
                <Stack direction="row" alignItems="top" gap={1}>
                  <AccessAlarmIcon color='primary' />
                  <Typography>{blogs[0]?.duration} Min.</Typography>
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
                  <DeleteOutlinedIcon onClick={handleClickOpen}></DeleteOutlinedIcon>
                </Grid>
              ) : ""}
            </Grid>
            <DialogDelete isOpen={deleteDialogOpen} handleClose={() => setDeleteDialogOpen(false)} handleDelete={() => handleDeleteBlog(item.uid)} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BlogSection;
